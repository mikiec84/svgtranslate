// SVG Translate.

// Require images used in HTML, so they can be used as assets.
require( 'oojs-ui/dist/themes/wikimediaui/images/icons/language.svg' );
require( 'oojs-ui/dist/themes/wikimediaui/images/icons/logo-Wikimedia-Commons.svg' );
require( 'oojs-ui/dist/themes/wikimediaui/images/icons/download.svg' );

// Set up App namespace.
global.App = {};

// Load i18n message files.
$( function () {
	var lang = $( 'html' ).attr( 'lang' ),
		messagesToLoadUls = {},
		messagesToLoadApp = {};
	messagesToLoadUls[ lang ] = appConfig.assetsPath + '/i18n/jquery.uls/' + lang + '.json';
	messagesToLoadApp[ lang ] = appConfig.assetsPath + '/i18n/app/' + lang + '.json';
	if ( lang !== 'en' ) {
		// Also load English files for fallback.
		messagesToLoadUls.en = appConfig.assetsPath + '/i18n/jquery.uls/en.json';
		messagesToLoadApp.en = appConfig.assetsPath + '/i18n/app/en.json';
	}
	$.i18n().locale = lang;
	$.i18n().load( messagesToLoadUls );
	$.i18n().load( messagesToLoadApp )
		.then( App.addLanguageSettingsLink );
} );

/**
 * Add the language-settings link to the user nav list. Called after i18n messages are loaded.
 */
App.addLanguageSettingsLink = function () {
	// Create the link.
	var $langSelectorButton = $( '<a>' )
		.html( $.i18n( 'language-settings' ) )
		.attr( 'href', '#lang-dialog' );
	// Configure ULS on the link.
	$langSelectorButton.uls( {
		languages: appConfig.languages
	} );
	// Add the link to the DOM.
	$( 'nav.user ul' ).prepend( $( '<li>' ).append( $langSelectorButton ) );
};
