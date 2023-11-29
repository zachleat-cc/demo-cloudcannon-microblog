module.exports = function (Liquid) {
	this.registerFilter('isValidUrl', function(url) {
		try {
			new URL(url);
			return true;
		} catch(e) {
			return false;
		}
	});
}