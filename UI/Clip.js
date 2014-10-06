if (support && support.DOM && support.UI)
function Clip (id, e, options, parent) {
	try {
		support.strict.type(this);
		var Clip = this;
		
		if (!options) options = {};
		
		with (support.DOM) {
			if (options.implement instanceof Associaitive) {
				// Another kind of associative exists and doesn't need construction,
				// just our methods.
			}
			else if (!options.implement) Associative.call(Clip, id, e, options, parent);
		}
		
		
	} catch (err) { return null; }
	
	
	{ // Properties
		Clip.size = function () {
			if (argument.length == 0) return ({x:$(a).offsetWidth, y:$(a).offsetHeight});
		};
	}
}
if (Clip) {
	// Define custom tag id's as /not/ case senstive to avoid a regxp on
	// 	instancing from inline document plant.
	support.UI.Clip = support.UI.CLIP = support.UI.clip = Clip;
	
	with (support) {	with (strict) {	with (DOM) {
		inherit ( {pack:support.UI, Clip : Associative} );
	}/*support*/}/*strict*/}/*DOM*/
}
