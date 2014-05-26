'use strict';

angular.module('sampleApp')
  .controller('MainCtrl', function ($scope, LocaleLoader, Locale) {
    angular.extend($scope, {
        /**
         * set the locale to the locale defined by 'key'
         * @param key e.g. 'en_US'
         */
        setLocale: function(key) {
            LocaleLoader(key).then(function(lang) {
                Locale.uses(lang);
            });
        }
    })
  });
