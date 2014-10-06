if (support && support.DOM)
(function _define_Associative () { /* keep direct type access off limits */
/*
 * Associative
 *	Wraps a DOM Element node.  Access to the node and alteration through $
 *	
 *	Defined in code:
 *		new Associative("myTag", [existing DOM Element]);
 *
 *	Defined in an xhtml 1.0 strict document:
 *		<Asscociative:myTag [id="myTag"]></Associative:myTag>
 *	Defined in a html5 document:
 *		<Associative:myTag [id="myTag"] />
 *		<div id="Associative:myTag"></div>
 *
 * It will treat custom tags and tags with types delimited by ':' in an id
 *	attribute of a supporting document type.  If there is a discrepency between
 *	a custom tag's implicit Element name and it's id, the Element name is
 *	accepted as that Associative's name, and overwritten in the id attribute.
 */
function Associative (id, e, options, parent) {
/*
 * id : required
 * e : not required, orverwritten by, if element with id exists
 * c : not required, assumed window if not provided
 */
	try { // Pre
		var Associative = this;
		if (!support.strict.type(this)) return null;
		if ((parent || typeof parent != "undefined")
		&& !(parent instanceof support.DOM.Associative)) return null;
		
		if (!options) options = {};
		if (!options.delimter) options.delimiter = "_";
		
		// Create / Find / Verify e
		with (support.DOM) {
			if (!id) throw support.Error("Associative requires an id argument.");
			if ($(id)) {
				
				if (!e || !e.getAttribute || e !== $(id) ) e = $(id);
				if (e.length) e = e[0];
				findParentAssociative();
				e.setAttribute("id", id);
				e.setAttribute("name", id);
			}
			else if (e) {
				if (e.nodeType == 1) {
					
					findParentAssociative();
					id = parent?parent.$().getAttribute("id")+options.delimiter+id:id;
					e.setAttribute("id", id);
					e.setAttribute("name", id);
				}
			}
			else {
				e = $({create:"div", attributes: {id:id, name:id} });
				parent.$({add : e });
				findParentAssociative();
				id = parent?parent.$().getAttribute("id")+options.delimiter+id:id;
				e.setAttribute("id", id);
				e.setAttribute("name", id);
				
			}
		}
		e.Associative = Associative;
	} catch (err) { if (err instanceof support.Error) return null; }
	
	{ // Methods
		
		function findParentAssociative () {
			if (parent && parent[id]) delete parent[id];
			function test (parent) {
				if (typeof parent.Associative != "undefined"
				&& parent.Associative instanceof support.DOM.Associative) {
					return parent.Associative;
				}
				else if (parent.parentNode) {
					return test(parent.parentNode);
				}
				else return null;
			}
			parent = test (e.parentNode);
			if (parent) parent[id] = Associative;
		}
	}
	
	{ // Properties
		Associative.$ = Associative._alter = function () {
			return support.DOM.alter.call(e, arguments);
		};
		Associative.getParent = function () { return parent;};
		Associative.listen = function (options) { return support.listen(e, options);};
	}
}

if (Associative) {
	support.DOM.Associative = Associative;
}

})(); /* obscure type access */
