support.include (support.path+"Support/DOM/Associative.js", support.path+"Support/Client/Client.js", { callback: function () {
function App () {
	try { // Pre-construct
		if (!support.strict.type(this)) return null;
		var App = this;
		var client = new support.client.Client( new support.DOM.Associative("page", document.body) );
	} catch (er) { return null; }
	
	client.onload = function () {// The main client is considered the base reference point for an API end user.
		for (var prop in client) {
			if (client[prop] instanceof support.DOM.Associative) {
				window[prop] = client[prop]; 
			}
		}
	};
	
	{ // Properties
		App.client = client;
	}
	
	{ // Post-construction
		
	}
}
if (App) {
	support.app = new App ();
}

}}); // Require libs
