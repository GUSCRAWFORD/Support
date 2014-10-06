if (support) support.include (support.path+"Support/DOM/DOM.js", support.path+"Support/DOM/Associative.js", {callback: function () {
function UI () {
	try {
		support.strict.type(this);
		var UI = this;
		
		support.Package.call(UI, "UI");
		
	} catch (err) { return null; }
	
	{	// Include pack members.
		support.include(support.path+"Support/UI/Clip.js", {callback:UI.load} );
	}	
}
if (UI) {
	support.UI = UI;
	
	with (support.strict) {
		inherit( { pack: support, UI : support.Package } );
		
	}
	
	support.UI = support.ui = new UI();
}

}/*cb*/}/*ops*/); // Requie libs
