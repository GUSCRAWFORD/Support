if (support && support.DOM && support.Ajax && support.DOM.Associative) // Require these types
(function _define_Client () { /* Keep direct access off limits */
/*
 * Client represents a piece of a webpage.
 *
 */
 
function Client (a) {
/*
 * let a be an Associative type
 */
	try {  // Pre-construct
		if (!support.strict.type(this)) return null;
		if (!a) throw new support.Error("Client requires an Associative reference.");
		var Client = this;
		//var ready = false;
	} catch (err) { return null; }
	
	
	{ // Methods
		function associate (e) { // Please re-write this:
			/*
			 * > Does the possible association have:
			 * a namespace
			 * an id or name with a colon
			 * 	> is the space or colon preposition referencing something in a package?
			 *  + Associate
			 */
			if (typeof e.nodeType != "undefined" && e.nodeType == 1) {
				
				for (var ch  = 0; e.children[ch]; ch++) {
					if (e.children[ch].nodeType == 1
					&&	(e.children[ch].nodeName.indexOf(":") >= 0
						|| e.children[ch].getAttribute("id") || e.children[ch].getAttribute("id")
						&& ( e.children[ch].getAttribute("id").indexOf(":") >= 0
						|| e.children[ch].getAttribute("name").indexOf(":") >= 0) ) ) {
					/*
					 * :'s are illegal in an XML attribute, but allowable in any HTML version.
					 *	they're allowable in this form, so as to offer an easy option avoid using
					 *	namespace altogether.
					 *
					 * We treat for both in this code
					 */
						var ops = e.children[ch].getAttribute("options");
						if (typeof ops =="string" && ops.indexOf("{") >= 0 && ops.indexOf("}") >= 0)
							
						e.children[ch].removeAttribute("options");
						var nchain = e.children[ch].nodeName.split(":");
						
						var formedID = null;
						if (nchain.length == 1) { // Naming and type occur in the id or name attr.
							var nchain = e.children[ch].getAttribute("id").split(":");
							if (!nchain || nchain.length == 1)
								var nchain = e.children[ch].getAttribute("name").split(":");
							//if (!nchain || nchain.length == 1)
								//return null;
						}
						else {
							// We might get a custom tag with an id.  Keep this if so, and name based on
							//	the case sensitive id or name.  This may be a type, indicating an html tag also.
							if (e.children[ch].getAttribute("id") ) {
								if (e.children[ch].getAttribute("id").lastIndexOf(":") >= 0) {
									var malformedID = e.children[ch].getAttribute("id");
									formedID = malformedID.substr(malformedID.lastIndexOf(":")+1);
									e.children[ch].setAttribute("id", formedID);
								} else var formedID = e.children[ch].getAttribute("id");
							}
							
						}
						var uname = formedID?formedID:nchain[nchain.length - 1];
						//var htmtag = uname.match(/(div|a|span|p|img|canvas|)/i);

						var ptype = nchain[nchain.length - 2];
						if (formedID) formedID = null;
						var pkgdir = null;
						if (ptype.indexOf(".") >= 0) {
							pkgdir = ptype.split(".");
							function deref(obj, index, pkg) {
								if (index < pkg.length - 1) {
									return deref(obj[pkg[index]], index + 1, pkg);
								}
								else return obj[pkg[index]];
							}
						}
						
						
						var tref = (pkgdir)?
							deref(window.support, 0, pkgdir)
								:(window.support[ptype]? window.support[ptype] : support.UI[ptype]);
						if (!tref) { // Look harder
							var packs = support.getPackages();
							
						}
						
						
						
						if (tref) {
							with (support.DOM) {
								var normalChild = $({create:"div"});
								while (e.children[ch].firstChild) {
									$(normalChild, {add:
										$(e.children[ch], {remove:
												e.children[ch].firstChild
											})
										});
								}
								for (var attr = 0; e.children[ch].attributes[attr]; attr ++) {
									normalChild.setAttribute(e.children[ch].attributes[attr].name || e.children[ch].attributes[attr].nodeName, e.children[ch].attributes[attr].value||e.children[ch].attributes[attr].nodeValue);
								}
								$(e, {replace:e.children[ch], replacement:normalChild} );
							}
							
							try {
								// Assign any first level associative objects by their case-insensitive name to the parent Client.
								Client[uname] = Client[uname.toUpperCase()] = Client[uname.toLowerCase()] = new  tref (uname, e.children[ch]);
								if (	!(Client[uname] instanceof support.DOM.Associative)	)
									throw new support.Error ("Implicit Associative extention instatce fails inheritence.");
							}
							catch (err) { delete Client[uname]; return null; }
						}
					// An inline-declared associative
						
					} // Namespaced
					if (e.children[ch].nodeType == 1) associate(e.children[ch]);
				} // Children
				
			} // Elements
		}
		
		function update () {
			
		}
		
		function refresh () {
		
		}
		
		function load () {
			associate(a.$());
			if (typeof Client.onload == "function")
				Client.onload();
		}
	}
	
	{ // Properties
		Client.associate = associate;
		Client.refresh = refresh;
	}
	
	{ // Post Construction
		with (support) {
			include (path+"Support/Client/Slide.js", path+"Support/Client/View.js", {callback: function  () {
				if (typeof UI == "undefined" || UI.Clip) load();
				else if (!UI.Clip) {
					// UI exists, but not clip, so wait for UI to finish loading
					UI.onload = function () {load();};
				}
			}});
		}
	}
}
if (Client) {
	support.client = support.CLIENT = {Client : Client};
}

})(); /* definition closure */
