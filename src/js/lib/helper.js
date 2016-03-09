module.exports = new function(){
	this.addClass = function(node, nclass){
		if(typeof node === 'undefined' || node === null) return;
		if(!this.hasClass(node, nclass)){
			node.className = node.className+' '+nclass;
		}
	};
	this.removeClass = function(node, nclass){
		if(typeof node === 'undefined' || node === null) return;
		node.className = node.className.replace(new RegExp('(^|\\s)'+nclass+'(\\s|$)'),'');
		return;
	};

	// Find out if a DOM element has a CSS class
	this.hasClass = function(node, nclass){
		if(typeof node === 'undefined' || node === null) return;
		return (node.className.match(new RegExp('(^|\\s)'+nclass+'(\\s|$)')) !== null);
	};
}
