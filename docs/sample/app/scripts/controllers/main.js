'use strict';

angular.module('sampleApp')
  .controller('MainCtrl', function ($scope, LocaleLoader, Locale, $window) {
    angular.extend($scope, {
        /**
         * set the locale to the locale defined by 'key'
         * @param key e.g. 'en_US'
         */
        setLocale: function(key) {
            LocaleLoader(key).then(function(lang) {
                Locale.uses(lang);
            });
        },

        translateInCode: function() {
            $window.alert("Locale('lead-copy') is '" + Locale('lead-copy') + "'");
        }
    })
  });
