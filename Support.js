function Support () {
	{ // Init
		var Support = this;
	}
	
	{ // Methods
/************************************************************
 * 	[!]	include												*
 * 		Adds external scripts into a webpage				*
 *	ex: include ("script.js" [, "script2.js", ...], {		*
 *			callback: function() {}, errback: function() {} *
 *		});													*
 ************************************************************/
		function include (uri, options) {
			var index = 0;
			if (typeof uri == "string") {
				var scriptSet = [];
				for (var a = 0;arguments[a]; a++) {
					if (typeof arguments[a] == "string")
						scriptSet.push(arguments[a]);
				}
				var lastarg = arguments[arguments.length -1];
				if (typeof lastarg == "object") options = lastarg;
				include (scriptSet, options);
			}
			else if (typeof uri == "object") {
				if (uri.length) {
					try {
						insert();
					}
					catch (err) {
						throw new Error ("include: failed", err);
					}
				}
			}
		    
		    
		    
		    function done () {
		    	if (index >= uri.length) {
		    		if (options && typeof options.callback == "function")options.callback();
		    	}
				else if (index < uri.length) {
					try {
						insert();
					}
					catch (err) {
						throw new Error ("include '"+uri[index]+"': failed", err);
					}
				}
			}
			
		    function insert () {
		    	var head = (document.getElementsByTagName("HEAD"))[0];
				for (var s in includes) {	// Don't include a script twice.
					if (includes[s].indexOf(uri[index]) >= 0) {
						index ++;
						done ();
						
						return null;
					}
						
				}
				includes.push(uri[index]);
				var	insertion = document.createElement("SCRIPT");
				with (insertion) { // <script ... >
					insertion.setAttribute("language", "javascript");
					insertion.setAttribute("type", "text/javascript");
					insertion.setAttribute("src", uri[index]);
				}
				
				// Map this callback into Internet Exploder
				if (navigator.userAgent.indexOf("MSIE") >= 0) {
					if (navigator.userAgent.indexOf("MSIE 9") >= 0) {
						insertion.onactivate = done;	// [?]	This seems to work
					}
					else {
						insertion.onreadystatechange = done;	// [!] <= IE 8 
					}
				}
				else insertion.onload = done; // Mapping for Chrome & moderns
		
				// <head>
				//   + <script>   <---- put
				head.appendChild(insertion);
				index ++;
			}
		} // FINISHED include (uri)
		
		function listen (target, options) {
			if (target.nodeType = 1 || target === window) {
				if (!options) options = {};
				if (!options.capture) options.capture = false;
				if (!options.untrusted) options.untrusted = false;
				
				for (var evt in options) {
					if (typeof (options[evt] == "function")) {
						target[addEv](addEv=="attachEvent"?"on":""+evt, options[evt], options.capture, options.untrusted);
					}
				}
				
			}
		}
	}
	
	{ // Internal Properties
		var errors = [];	// Keep a log of errors
		var packages = []; // Keep a list of packages
		var includes = []; // Keep a list of include requests
		var addEv = window.addEventListener?"addEventListener":"attachEvent";
	}
	
	{ // Nested Types
		function Error (info, err) {
			{ // Init
				if (this === window)	return new Error (info, err);
				else if ( !(this instanceof support.Error) ) return null;
				var Error = this;
				
			}
			
			{ //  Methods
				function toString () {
					return info;
				}
			}
			
			{ // Properties & Post init
				Error.toString = toString;
				logErr(Error);
			}
		}

		function Implementable () {
			if (this === window) return new Implementable();
			var Implementable = this;
		}
		
		function Package (name, onload) {
			if ( !(this instanceof support.Package) ) return new support.Package(name);
			var Package = this;
			Package.onload = onload||null;
			var loaded = false;
			
			function load () {
				loaded = true;
				packages.push(Package); // Give back to the list of packages in the support clos.^
				// This is private to closure
				if (typeof Package.onload == "function")
					Package.onload();
			}
			
			function isLoaded () { return loaded; }
			
			Package.isLoaded = isLoaded;
			Package.load = load;
		}
		
		function Strict () {
			var StrictInstance = this;
			
			{ // Strict: Methods
			
				function inherit (args) {
					var pack = args.pack || support; var child = null; var parent = null;
					for (var a in args) {
	
						if (a != "pack") try {
							if(typeof pack[a] == "function"
							|| pack[a].constructor)
								child = typeof(pack[a])=="function"?pack[a]:pack[a].constructor;
							else child = eval(a);
							parent = args[a];

							if (typeof child  == "function" && typeof parent == "function") {
								child.prototype = new parent (StrictInstance);
								//child.prototype[parent.name] = {};
								// Create a property with the parent's name, that contains
								// 	the orgiinal un-shadowed properties.
								//for (var p in child.prototype) {
								//	child.prototype[parent.name][p] = child.prototype[p];
								//}
								child.prototype.constructor = child;
							} else throw new Error ("support.strict.inherit(function, function): expects 2 function references.");
						} catch (er) {
							if (!er instanceof support.Error)
								new support.Error ("Malformed inheritence.", er);
						}
					}
				}
				
				function implement (implementee, args) {
					if (!implementee) return null;
					if (typeof args == "object") {
						for (var a in args) {
							try {
								var implementable = eval(a);
								
								if (typeof (implementable) == "function") {
									implementee[implementable.name] = new implementable.call (implementee, args[a]);
									if (!implementable instanceof Implementable) {
										throw new Error ("Implement fails '"+implementable.name+"'.") ;
									}
								}
								// 
							} catch (err) { return null; }
						}
					}
				}
				
				function type (test) {
					if (typeof test != "object" && !test){
						throw new Error ("support.strict.type(["+typeof (test)+"]): fails.");
						return false;
					}
					else if (this instanceof Strict) {
						// ? So by passing support.strict, we do what? Tell it
						//  that we're setting a prototype 'child.prototype = new parent (StrictInstance);'
						if (arguments.callee.caller.arguments[0] === StrictInstance) {
							// This is a child function-class' prototype.
						
						
							// Provide an opportunity to STOP construction, because
							//	the function prototype relation is set already.
							return false;
						}
						else
							return type.call(test, test);
					}
					else if (this instanceof test.constructor) {
						return true;						
					}
					else if (this === window) {
						throw new Error ("support.strict.type(["+typeof (test)+"]): fails.  Did you forget the 'new' keyword?");
						return false;
					}
					
				}
				
			}
			
			{ // Strict: Properties
				StrictInstance.implement = implement;
				StrictInstance.inherit = inherit;
				StrictInstance.type = type;
			}
			
		} // Defined Strict

	}
	
	{ // Methods
		function logErr (err) {
			if (typeof err === "object") errors.push(err);
		}
		
		function setDefaultPath () {
			
			var pathDef = document.getElementsByTagName("support:path")[0];
			var path = "";
			
			if (pathDef) path = pathDef.getAttribute("default");
			
			Support.path = path;
			
			if (Support.path != "") {
				while (Support.path.charAt(0) == "/")
					Support.path = Support.path.substr(1);
				if (Support.path.charAt(Support.path.length-1)!="/")
					Support.path += "/";
			}
			pathDef.parentNode.removeChild(pathDef);
		}
		
		function importPackages () {
						
			var packages = document.getElementsByTagName("support:package");
			
			var list = [];
			// Build an include list in the form libs/Support/Package/Package.js
			while (packages[0]) {
				list.push (packages[0].getAttribute("name"));
				list[list.length-1] = support.path+(packages[0].getAttribute("path")||"Support")+"/"+list[list.length-1]+"/"+list[list.length-1]+".js";
				packages[0].parentNode.removeChild(packages[0]);
			}

			include(list);
		}
	}
	
	{ // Properties
		Support.Error = Error;
		Support.getErrors = function () { return errors; };
		Support.getPackages = function () { return packages; };
		
		Support.include = include;
		Support.Implementable = Implementable;
		Support.listen = listen;
		Support.Package = Package;
		Support.strict = new Strict();
	}
	
	listen(window, {load : function () { // Last point-construction
			setDefaultPath();
			include (Support.path+"Support/Ajax.js", Support.path+"Support/DOM/DOM.js", {callback:importPackages});
		}
	});
	
}
window.support = new Support ();
