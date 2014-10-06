/************************************************************
 *	[A]	Ajax												*
 *		Manages any and all XMLHttpRequest's				*
 *			ex. support.ajax.open({ uri:"script.php",		*
 *					method:"GET"[ | "POST", mime:"type",	*
 *						payload:<-data->],
 *					query: {								*
 *						argument:"value" [, ...]			*
 *					}										*
 *				});											*
 ************************************************************/
if (support && support.DOM)
function Ajax () {
	var ajax = this; // Closure relative reference
    var streams = [];
	
	function createQueryString (key_value_array) {
		if (typeof key_value_array != "object") return null;
		// Setup a string with the json args
		var result = options.uri.indexOf("?") >= 0?"&":"?";
		for (item in key_value_array) {
			if (result != "?")  result += "&";
			result += item + "=" + encodeURIComponent(key_value_array[item]);
		}
		if (result == "?")	result="";
		return result;
	}
    
    /*
     *  ex: support.ajax.open({uri:"http://...", query:{option1:2, option2:"setting"}, method:"GET"})
     *
     */
    function open_classic_ie (options) {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        return send (xhr, options);
    }
    
    function open_webkit (options) {
        var xhr = new XMLHttpRequest();
        return send(xhr, options);
    }
    
    function send (xhr, options) {
        if (!options || !options.uri)   return (-1);
        
        if (typeof options.method == "undefined")	options.method = "GET";
        options.method = options.method.toUpperCase();
        if (!options.mime) options.mime = "application/x-www-form-urlencoded";
        if (typeof options.query == "undfined")		options.query = {};
        
        var servingID = streams.length;
        streams.push(xhr);
        xhr.stream = servingID;
        
        { // add a location structure consistent with window's
            xhr.location = {};
            if (options.uri.indexOf("http") >= 0) {
            	var eating = options.uri.substr(options.uri.indexOf("//")+2);
            	xhr.location.host = eating.substr(0, eating.indexOf("/"));
            	eating = eating.substr(eating.indexOf("/"));
            	xhr.location.path = eating.substr(0, eating.lastIndexOf("/"));
            }
            else {
            	xhr.location.host = window.location.host;
            	xhr.location.path = window.location.path || "";
            	xhr.location.path += options.uri.substr(
            		(options.uri[0]=="/"?1:0),
            			(options.uri.lastIndexOf("/")>=0?
            					options.uri.lastIndexOf("/")-(options.uri[0]=="/"?
            							1:0):options.uri.length - (options.uri[0]=="/"?1:0)));
            }
        }
        
        // Setting the state change handler
        xhr.query = options.query;
        xhr.upload.onprogress = function (event) {
        	if (typeof options.progress == "function") {
        		options.progress.call(xhr, event);
        	}
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (typeof options.callback == "function")	options.callback.call(xhr, xhr, options);
            }
            // Handle transmission problems
        };
		
        // Build appropriate request headers and send as instructed.
		if (typeof options.async == "undefined")    options.async = false;
		if (options.method == "GET") {
			xhr.open(options.method, options.uri + createQueryString(options.query), options.async);
			xhr.send();
		}
		else if (options.method == "POST") {	// GET is default, POST must be spec'd.
			xhr.open(options.method, options.uri + createQueryString(options.query), options.async);
			xhr.setRequestHeader("Content-type",options.mime);	// Specify data type if not a form or
			if (options.mime == "application/x-www-form-urlencoded")
				xhr.send(createQueryString(options.query).substr(1));
			else xhr.send(options.payload);
		}
		
		return servingID;
	} // FINISHED send (xhr, options)
	
    // Construct an AJAX policy	based on browser API
	if (typeof XMLHttpRequest == "undefined")
		ajax.open = open_classic_ie;
	else ajax.open = open_webkit;
}
if (Ajax) {
	support.Ajax  = Ajax;
}
