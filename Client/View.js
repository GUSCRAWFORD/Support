if (support.client) (function _define_View_ () {

function View (id, e, options, parent) { var View = this;
	with (support) {
		try {
			strict.type (this);
			
			DOM.Associative.call(View, id, e, options); // Construct parent
			id = View.$().getAttribute("id"); // id may have changed
			
			var viewClient = new client.Client(View);
			viewClient.onload = function () {
				
				initialize();
			};
			if (support.UI) View.UI = new support.UI.Clip (id, e, {implement:View});
		} catch (er) {
			if (! er instanceof Error)
				return new Error(er.toString(), er);
		}
		var slides = [];
	}
	
	{ // Methods
		function push () {
			var viewInstance = View;
			with (support.client) {	//		id						 ,	elm, {..} , parent
				var slide = new Slide("slide_"+String(slides.length), null, null, viewInstance);
				slides.push (slide);
				return slide;
			}
			
		}
		
		function initialize () { // Create an initial slide, put any element contents in it
			var slide0 = push();
			while (e.childNodes.length > slides.length) {
				if (typeof e.childNodes[0].Associative == "undefined"
					|| ! e.childNodes[0].Associative instanceof support.client.Slide) {
					slide0.$({add : e.childNodes[0].parentNode.removeChild(e.childNodes[0])});
				}
			}
		}
	}
	
	{ // Properties
		
	}
}

with (support.strict) { // Inherit Associative
	support.client.View = support.client.VIEW = support.client.view = View;
	inherit({pack:support.client, View : support.DOM.Associative});
}
})();