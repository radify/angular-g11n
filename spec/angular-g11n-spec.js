'use strict';

describe('ur.g11n', function(){
	describe('Locale', function () {

		beforeEach(module('ur.g11n'));

		beforeEach(inject(function(Locale) {
			Locale.reset();
		}));

		it('should be defined', function() {
			inject(function(Locale) {
				expect(Locale).toBeDefined();
			});
		});

		it('should be a function object', function() {
			inject(function(Locale) {
				expect(typeof Locale).toBe("function");
			});
		});

		it('should have a method uses()', function() {
			inject(function(Locale) {
				expect(Locale.uses).toBeDefined();
			});
		});

		it('should have a method add()', function() {
			inject(function(Locale) {
				expect(Locale.set).toBeDefined();
			});
		});
	});

	describe('Locale.uses()', function () {

		beforeEach(module('ur.g11n'));

		beforeEach(inject(function(Locale) {
			Locale.reset();
		}));

		it('should return `\'en\'` if no language is specified', function () {
			inject(function(Locale) {
				expect(Locale.uses()).toBe('en');
			});
		});

		it('should be able to change the used language', function () {
			inject(function(Locale) {
				Locale.uses('de');
				expect(Locale.uses()).toBe('de');
				Locale.uses('en');
				expect(Locale.uses()).toBe('en');
			});
		});
	});

	describe('Locale()', function () {

		beforeEach(module('ur.g11n'));

		beforeEach(inject(function(Locale) {
			Locale.reset();
		}));

		it('should set a simple translation message', function () {
			inject(function(Locale) {
				Locale.set('en', 'hello', 'Hello World !');
				expect(Locale('hello')).toBe('Hello World !');
			});
		});

		it('should set a translation message with variables', function () {
			inject(function(Locale) {
				Locale.set('en', 'hello-name', 'Hello {{ name }} !');
				expect(Locale('hello-name', {name: 'Angular'})).toBe('Hello Angular !');
			});
		});

		it('should set a translation message with count variable', function () {
			inject(function(Locale) {
				Locale.set('en', 'hello-world', {
					0: 'Hello {{ name }} you have no friends !',
					1: 'Hello {{ name }} you have one friend !',
					n: 'Hello {{ name }} you have {{ count }} friends !'
				});

				expect(Locale('hello-world', {name: 'Angular', count: 0})).toBe('Hello Angular you have no friends !');
				expect(Locale('hello-world', {name: 'Angular', count: 1})).toBe('Hello Angular you have one friend !');
				expect(Locale('hello-world', {name: 'Angular', count: 5})).toBe('Hello Angular you have 5 friends !');
			});
		});

		it('missing translation should return the ID', function () {
			inject(function(Locale) {
				expect(Locale('missing')).toBe('missing');
			});
		});
	});

	describe('t filter', function () {

		beforeEach(module('ur.g11n'));

		beforeEach(inject(function(Locale) {
			Locale.reset();
		}));

		it('should set a simple translation message', function () {
			inject(function(Locale, $filter) {
				Locale.set('en', 'hello', 'Hello World !');
				expect($filter('t')('hello')).toBe('Hello World !');
			});
		});

		it('should set a translation message with variables', function () {
			inject(function(Locale, $filter) {
				Locale.set('en', 'hello-name', 'Hello {{ name }} !');
				expect($filter('t')('hello-name', {name: 'Angular'})).toBe('Hello Angular !');
			});
		});

		it('should set a translation message with count variable', function () {
			inject(function(Locale, $filter) {
				Locale.set('en', 'hello-world', {
					0: 'Hello {{ name }} you have no friends !',
					1: 'Hello {{ name }} you have one friend !',
					n: 'Hello {{ name }} you have {{ count }} friends !'
				});

				expect($filter('t')('hello-world', {name: 'Angular', count: 0})).toBe('Hello Angular you have no friends !');
				expect($filter('t')('hello-world', {name: 'Angular', count: 1})).toBe('Hello Angular you have one friend !');
				expect($filter('t')('hello-world', {name: 'Angular', count: 5})).toBe('Hello Angular you have 5 friends !');
			});
		});

		it('missing translation should return the ID', function () {
			inject(function(Locale, $filter) {
				expect($filter('t')('missing')).toBe('missing');
			});
		});
	});

	describe('LocaleLoader', function () {

		var $httpBackend;

		beforeEach(module('ur.g11n'));

		beforeEach(inject(function(Locale, LocaleLoader, $injector) {
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.when('GET', 'https://s3.amazonaws.com/pixwel/catalogs/lang-en.json').respond({
				'hello': 'Hello World !',
				'hello-name': 'Hello {{ name }} !',
				'hello-world': {
					0: 'Hello {{ name }} you have no friends !',
					1: 'Hello {{ name }} you have one friend !',
					n: 'Hello {{ name }} you have {{ count }} friends !'
				}
			});
			LocaleLoader.catalogs([{
				lang: 'en', url: 'https://s3.amazonaws.com/pixwel/catalogs/lang-en.json'
			}]);
			Locale.reset();
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should be defined', function() {
			inject(function(LocaleLoader) {
				expect(LocaleLoader).toBeDefined();
			});
		});

		it('should be throw an exception if catalogs are not an array', function() {
			inject(function(LocaleLoader) {
				expect(function(){
					LocaleLoader.catalogs({
						lang: 'en', url: 'https://s3.amazonaws.com/pixwel/catalogs/lang-en.json'
					});
				}).toThrow(new Error('Catalogs must be an array of objects.'));
			});
		});

		it('should be throw an exception if language is not found in the catalogs', function() {
			inject(function(LocaleLoader) {
				expect(function(){
					LocaleLoader('it');
				}).toThrow(new Error('Invalid language.'));
			});
		});

		it('should show a simple translation message', function () {
			inject(function(Locale, LocaleLoader) {
				$httpBackend.expectGET('https://s3.amazonaws.com/pixwel/catalogs/lang-en.json');
				LocaleLoader('en').then(function() {
					expect(Locale('hello')).toBe('Hello World !');
				});
				$httpBackend.flush();
			});
		});

		it('should show a translation message with variables', function () {
			inject(function(Locale, LocaleLoader) {
				$httpBackend.expectGET('https://s3.amazonaws.com/pixwel/catalogs/lang-en.json');
				LocaleLoader('en').then(function() {
					expect(Locale('hello-name', {name: 'Angular'})).toBe('Hello Angular !');
				});
				$httpBackend.flush();
			});
		});

		it('should show a translation message with count variable', function () {
			inject(function(Locale, LocaleLoader) {
				$httpBackend.expectGET('https://s3.amazonaws.com/pixwel/catalogs/lang-en.json');
				LocaleLoader('en').then(function() {
					expect(Locale('hello-world', { name: 'Angular', count: 0 })).toBe('Hello Angular you have no friends !');
					expect(Locale('hello-world', { name: 'Angular', count: 1 })).toBe('Hello Angular you have one friend !');
					expect(Locale('hello-world', { name: 'Angular', count: 5 })).toBe('Hello Angular you have 5 friends !');
				});
				$httpBackend.flush();
			});
		});

		it('should show a translation message with missing count variable', function () {
			inject(function(Locale, LocaleLoader) {
				$httpBackend.expectGET('https://s3.amazonaws.com/pixwel/catalogs/lang-en.json');
				LocaleLoader('en').then(function() {
					expect(Locale('hello-world', { name: 'Angular' })).toBe('Hello Angular you have no friends !');
				});
				$httpBackend.flush();
			});
		});


		it('should show a simple translation message with similar language', function () {
			inject(function(Locale, LocaleLoader) {
				$httpBackend.expectGET('https://s3.amazonaws.com/pixwel/catalogs/lang-en.json');
				LocaleLoader('en-US').then(function() {
					expect(Locale('hello')).toBe('Hello World !');
				});
				$httpBackend.flush();
			});
		});

		it('should not load a catalog twice', function () {
			inject(function(Locale, LocaleLoader) {
				$httpBackend.expectGET('https://s3.amazonaws.com/pixwel/catalogs/lang-en.json');
				LocaleLoader('en').then(function() {
					expect(Locale('hello')).toBe('Hello World !');
				});
				$httpBackend.flush();
				LocaleLoader('en').then(function() {
					expect(Locale('hello')).toBe('Hello World !');
				});
				expect(function(){
					$httpBackend.flush();
				}).toThrow(new Error('No pending request to flush !'));
			});
		});
	});
});
