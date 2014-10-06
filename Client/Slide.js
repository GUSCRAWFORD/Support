if (support.client) (function _define_Slide_ () {

function Slide (id, e, options, parent) {
	with (support) {
		try {
			strict.type (this);
			var Slide = this;
			DOM.Associative.call(Slide, id, e, options, parent); // Construct parent
			
		} catch (er) {
			if (! er instanceof Error)
				return new Error(er.toString(), er);
		}
	}
	
	{ // Methos
		function fresh (data) {
			
			if (typeof data == "object") {
				if (data.include) {
					support.include(data.include, {callback:function () {
						delete data.include;
						fresh (data);
					}});
				}
				for (var order in data) {
					switch (order) {
					
					case "DOM": case "dom":
						var htm = data[order];
						with (support.DOM) {
							$(e, {add : htm});
						}
						break;
						
					case "SCRIPT": case "script":
						try {
							for (var itr in data[order]) {
								var script = id+"_"+(data.stream?data.stream+"_":"")+[itr]+"_script = function () {"+data[order][itr]+"};";
								script.call(Slide);
							}
						} catch (err) {
							new support.Error("Malformed Service script.", err)
						}
						break;
					}
				}
			} else throw new Error("Slide.fresh ( {...} ):  expects an Object.");
		}
	}
}

with (support.strict) {
	support.client.Slide = Slide;
	inherit ({ pack:support.client, Slide : support.DOM.Associative });
}
})();