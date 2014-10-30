/*******************************************************************************
 *
 * Async Loader
 *
 * Loads various scripts into the document.  Appends them after a defined node.
 *
*******************************************************************************/
define([], function() {

function insertElement( element, node ) {
	node.parentNode.insertBefore( element, node );
}

function createScript( src ) {
	var s = document.createElement( 'script' );
	s.type = 'text/javascript';
	s.async = true;
	s.src = src;
	return s;
}

return {
	facebook: function( fbPixelId, node ) {
		var _fbq = window._fbq = window._fbq || [];
		if (!_fbq.loaded) {
			insertElement( createScript( '//connect.facebook.net/en_US/fbds.js' ), node );
			_fbq.loaded = true;
		}
		_fbq.push(['addPixelId', fbPixelId]);
		_fbq.push(['track', 'PixelInitialized', {}]);
	},
	googleAnalytics: function( accountId, node ) {
		var _gaq = window._gaq = window._gaq || [];
		_gaq.push(['_setAccount', accountId]);
		_gaq.push(['_trackPageview']);
		insertElement( createScript( ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js' ), node );
	},
	script: function( src, node ) {
		insertElement( createScript( src, node ) );
	},
	stylesheet: function( href, node ) {
		var link = document.createElement( "link" );
		link.rel = "stylesheet";
		link.href = href;
		insertElement( link, node );
	}
};

});