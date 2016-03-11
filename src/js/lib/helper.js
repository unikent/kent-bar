module.exports = new function(){
	this.addClass = function(node, nclass){
		if (typeof node === "undefined" || node === null){
			return;
		}
		if (!this.hasClass(node, nclass)){
			node.className = node.className + " " + nclass;
		}
	};

	this.removeClass = function(node, nclass){
		if (typeof node === "undefined" || node === null){
			return;
		}
		node.className = node.className.replace(new RegExp("(^|\\s)" + nclass + "(\\s|$)"), "");
		return;
	};

	// Find out if a DOM element has a CSS class
	this.hasClass = function(node, nclass){
		if (typeof node === "undefined" || node === null){
			return;
		}
		return (node.className.match(new RegExp("(^|\\s)" + nclass + "(\\s|$)")) !== null);
	};

	this.isNodeDecendantOf = function(node, parent){
		var n = node, maxDepth = 100, depth = 0;
		// if parent doesn't equal body
		while (n && n !== document.body && depth < maxDepth){

			// if we hit the parent, the our node was a descendant of it after all.
			if (n === parent){
				return true;
			}

			// get next parent
			n = n.parentNode;
			// limit depth
			depth++;
		}

		// if we hit body / depth limit, assume this isn't a descendant
		return false;
	};
};
