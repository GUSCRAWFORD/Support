function DOM () {
	{ // Init
		try {
			if ( !support.strict.type(this) ) return null;
			var DOM = this;
		} catch (err) {
			if (err instanceof support.Error) {
				return null;
			}
		}
		
	}
	
	{ // Methods
		function alter (argz) { // Perform manipulations on the DOM
			var targetNode = this!==window?this:document.getElementsByTagName("body")[0];
				// Which node we're working in
			var outputNode = null; // Which node we're working with
			
			if (typeof argz == "object" && typeof argz.length != "undefined") {
				arguments = argz;
				outputNode = targetNode;
			}

			{ // Ad-hoc tool set
				function verify (operand) {
					if (typeof operand == "object" && operand)
						return operand;
					else if (typeof operand == "string")
						return document.getElementById(operand);
					else
						throw new support.Error("support.ater fails: Bad target DOM element ("+typeof (operand)+").");
				}
			
				function add (adding, before) {
					try { adding = verify (adding); }
					catch (err) {
						return null;
					}
					if (before) {
						try { before = verify (before); }
						catch (err) { return null; }
					
						return outputNode = targetNode.insertBefore(adding, before);
					}
					else if (adding) {
						return outputNode = targetNode.appendChild(adding);
					} // Interpret the target and append.
					return null;
				}
			
				function rem (remove) {
					try {remove = verify (remove); }
					catch (err) { return null; }
					return outputNode = targetNode.removeChild(remove);
				}
				
				function rep (replace, replacement) {
					try {
						replace = verify (replace);
						replacement = verify (replacement);
					} catch (er) { return null; }
					return outputNode = targetNode.replaceChild(replacement, replace);
				}
			} // Ad-hoc tool set
			
			// Arguments to function
			for (var n = 0; arguments[n]; n++) {
				if (typeof arguments[n] == "string") {
					// A text ID Set the target object
					if (arguments[n] == "body") {
						targetNode = document.getElementsByTagName("body")[0];
					}
					else targetNode = document.getElementById(arguments[n]);
					
					outputNode = targetNode;
				}
				else if (typeof arguments[n] == "object" && arguments[n].nodeType == 1) {
					// element reference.  Set the target object
					targetNode = arguments[n];
					outputNode = targetNode;
				}
				else if (typeof arguments[n] == "object") {
					for (var c in arguments[n]) {
						switch ( c ) {	// Where c is a command in the form:
										//	{command:Operand}
						case "create":
							outputNode = document.createElement(arguments[n] [c]);
							targetNode = outputNode;
							break;
							
						case "add":
							if (arguments.to) {
								var to = arguments.to;
								delete arguments.to;
								alter.call(to, arguments);
							}
							else if (!arguments[n].before) {
								add (arguments[n] [c]);
							}
							break;
							
						case "before":
							if (arguments[n].add) {
								add (arguments[n].add, arguments[n] [c]);
							}
							break;
						
						case "remove":
							rem(arguments[n] [c]);
							break;
						case "replace":
							if (arguments[n].replacement) {
								rep(arguments[n] [c], arguments[n].replacement);
							}
							break;
							
						case "attr": case "attributes": case "props": case "properties":
							if (typeof arguments[n] [c] == "object") {
								for (var v in arguments[n] [c]) {
									if (c == "attr" || c == "attributes")
										targetNode.setAttribute(v, String(arguments[n] [c] [v]));
									else targetNode[v] = arguments[n] [c] [v];
								}
							}

							break;
						} // Decide what to do on commands
					}
				}
				// Decide if we're being asked to re-target an element,
				//	or act on an already targeted element.
			} // Cycle arguments
			
			return outputNode;
		} // Defined alter.
	}
	
	{ // Define
		DOM.alter = DOM.$ = alter;
	}
}

if (!support) throw ("Support not defined.  Make sure Support.js included in a <script> tag.");
else support.DOM = new DOM ();
