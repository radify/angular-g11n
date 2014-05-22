'use strict';

var app = angular.module('sampleApp', [
    'ur.g11n'
]);

app.run(function(Locale, LocaleLoader) {
    // Set up LocaleLoader so it knows about the catalogs
    LocaleLoader.catalogs([
        {lang: 'en', url: '/catalogs/lang-en.json'},
        {lang: 'izzle', url: '/catalogs/lang-izzle.json'}
    ]);

    // Choose a language and load it
    LocaleLoader('en').then(function(lang) {
        Locale.uses(lang);
    });

    // you can define locale inline if you prefer

    /*
     Locale.set('en', {
     "lead-copy": "Simple Translations for AngularJS",
     "brought-to-you-by": "Brought to you by",
     "Where can I get angular-g11n?": "Where can I get angular-g11n?"
     });
     Locale.set('izzle', {
     "lead-copy": "Sizzle Trizzle for Angulizzle",
     "brought-to-you-by": "Brought to you by",
     "Where can I get angular-g11n?": "Whizzle cizzle I gizzle angulizzle"
     });

     Locale.uses('en');
     */
});
