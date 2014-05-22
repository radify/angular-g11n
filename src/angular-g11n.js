(function(window, angular, undefined) {
	'use strict';

	var forEach   = angular.forEach,
		extend      = angular.extend,
		isString    = angular.isString,
		isObject    = angular.isObject,
		isArray     = angular.isArray,
		isFunc      = angular.isFunction,
		isUndefined = angular.isUndefined;

	angular.module('ur.g11n', ['ng']).provider('Locale', function() {

		extend(this, {

			/**
			 * @name ur.g11n.Locale
			 * @requires $interpolate
			 *
			 * @description
			 * The `Locale` service translate a keyID to the current locale.
			 *
			 * Setting manually a catalog:
			 * <pre>
			 *     Locale.set('en', {
			 *        'hello': 'Hello World !'
			 *        'hello-name': 'Hello {{ name }} !'
			 *        'hello-world': {
			 *             0: 'Hello {{ name }} you have no friends !',
			 *             1: 'Hello {{ name }} you have one friend !',
			 *             n: 'Hello {{ name }} you have {{ count }} friends !'
			 *        }
			 *     });
			 * </pre>
			 *
			 * Switching locale:
			 * <pre>
			 *     Locale.uses('en');
			 * </pre>
			 *
			 * Getting the locale:
			 * <pre>
			 *     Locale.uses();
			 * </pre>
			 *
			 * Example of use:
			 * <pre>
			 *     Locale('hello'); // Hello World !
			 *     Locale('hello-name', {name: 'Angular'}); // Hello Angular !
			 *     Locale('hello-world', {name: 'Angular', count: 5}); // Hello Angular you have 5 friends !
			 * </pre>
			 *
			 * @param {string} key A token which represents a keyID
			 * @param {object} params An object hash for dynamic values
			 */
			$get: ['$interpolate', function($interpolate) {
				var language = 'en', catalogs = {}, count = 'count', scope = null;

				var Locale = function(key, params) {
					params = typeof params !== 'undefined' ? params : {};

					if (language in catalogs && key in catalogs[language]) {
						return _parse(catalogs[language][key], params);
					}
					return key;
				};

				var _parse = function(message, params) {
					if (isObject(message)) {
						var nb = params[count] > 1 ? 'n' : params.count;

						if (!message[nb]) {
							for (nb in message) break;
						}
						message = message[nb];
					}
					return $interpolate(message)(params);
				};

				extend(Locale, {
					uses: function(lang) {
						if (isUndefined(lang)) {
							return language;
						}
						if (isFunc(lang.then)) {
							return lang.then(function(lang) { language = lang; });
						}
						language = lang;
					},
					set: function(lang, key, value) {
						if (!(lang in catalogs)) {
							catalogs[lang] = {};
						}
						if (isObject(key) && isUndefined(value)) {
							catalogs[lang] = key;
						} else if (isString(key) && !isUndefined(value)) {
							catalogs[lang][key] = value;
						} else {
							throw new Error('Invalid parameters!');
						}
					},
					scope: function(newScope) {
						if (isUndefined(newScope)) {
							return scope;
						}
						scope = newScope;
					},
					reset: function() {
						language = 'en';
						catalogs = {};
						scope = null;
					}
				});
				return Locale;
			}]
		});

	}).filter('t', ['Locale', '$parse', function(Locale, $parse) {

			/**
			 * @name ur.g11n.t
			 *
			 * @description
			 * The key-based translation filter for the `Locale` service.
			 *
			 * Example of use:
			 * <pre>
			 *     <h1>{{ hello | t }}</h1>
			 *     <h1>{{ hello-name | t: { name: "Angular" } }}</h1>
			 *     <h1>{{ hello-world | t: { name: "Angular", count: 5 } }}</h1>
			 * </pre>
			 *
			 * @param {string} key A token which represents a keyID
			 * @param {object} params An object hash for dynamic values
			 */
			return function(key, params) {
				if (!isObject(params)) {
					params = $parse(params)();
				}
				return Locale(key, params);
			};

		}]).provider('LocaleLoader', function() {

		extend(this, {

			/**
			 * @name ur.g11n.LocaleLoader
			 *
			 * @description
			 * The `LocaleLoader` factory allow to dynamically load catalogs from an URL.
			 *
			 * Defining the catalog urls:
			 * <pre>
			 *     LocaleLoader.catalogs([
			 *         {lang: 'en', url: '/js/catalogs/lang-en.json'},
			 *         {lang: 'fr', url: '/js/catalogs/lang-fr.json'}
			 *     ]);
			 * </pre>
			 *
			 * Example of use:
			 * <pre>
			 *     LocaleLoader('en').then(function(lang) {
			 *         Locale.uses(lang);
			 *         Locale('hello');
			 *     });
			 *
			 *     LocaleLoader('en_US').then(function(lang) {
			 *         Locale.uses(lang); //lang is the finded one i.e 'en' here.
			 *         Locale('hello');
			 *     });
			 * </pre>
			 *
			 * @param {string} lang The language id
			 * @param {string} url The url of a JSON catalog
			 */
			$get: ['Locale', '$http', '$q', function(Locale, $http, $q) {
				var catalogs = [];

				var _findUrl = function(lang, strict) {
					for (var i in catalogs) {
						if (strict && (catalogs[i].lang === lang)) {
							return i;
						}
						if (!strict && (catalogs[i].lang === lang.split(/(_|-)/)[0])) {
							return i;
						}
					}
					return null;
				};

				var LocaleLoader = function(lang) {
					var deferred = $q.defer(), i;

					i = _findUrl(lang, true);
					i = i !== null ? i : _findUrl(lang, false);

					if (i === null) {
						throw new Error('Invalid language.');
					}
					lang = catalogs[i].lang;

					if (catalogs[i].loaded) {
						deferred.resolve(lang);
						return deferred.promise;
					}

					// @hack We're loading language files from S3, so forcibly override Authorization header
					// set by angular-http-auth:
					var headers = { Authorization: null };

					$http.get(catalogs[i].url, { headers: headers }).success(function(data, status, headers) {
						catalogs[i].loaded = true;
						Locale.set(lang, data);
						deferred.resolve(lang);
					}).error(function(data) {
						deferred.reject(lang);
					});
					return deferred.promise;
				};

				extend(LocaleLoader, {
					catalogs: function(data) {
						if (isUndefined(data)) {
							return catalogs;
						}
						if (!isArray(data)) {
							throw new Error('Catalogs must be an array of objects.');
						}
						catalogs = data;
					}
				});

				return LocaleLoader;
			}]
		});
	});

})(window, angular, undefined);