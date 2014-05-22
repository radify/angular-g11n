angular-g11n
============

Simple globalization (internationalization + localization) for AngularJS. Developed by [Radify](http://radify.io).

## Usage example

TODO pick out a better example

```javascript
services.service('UserCache', function(model, Locale) {
	return {
		// ...
		userNotFound: function(id) {
			this.userCache[id] = {
				name: Locale('admin.reports.not-found'),
				emailNormal: Locale('admin.reports.not-found')
			};
		}
	};
});
```

## Contributing

If you want to contribute to the angular-g11n project, please feel free! Install all the developer dependencies with:

```bash
npm install
bower install --dev
```

We have several Gulp tasks that can help you:

### Running the tests

Testing uses [Jasmine](http://jasmine.github.io/), [Karma](http://karma-runner.github.io/0.12/index.html), [PhantomJS](http://phantomjs.org/) and [Gulp](http://gulpjs.com/). All these are installed when you do an `npm install --dev`. You can run the tests with:

```bash
node_modules/gulp/bin/gulp.js test
```

If you run the watch task, it will run the tests in 'watch' mode, so it'll run on any change you make:

```bash
node_modules/gulp/bin/gulp.js watch
```

### Linting the code

```bash
node_modules/gulp/bin/gulp.js lint
```

### Committing back

Simply push your changes to a branch on your repository and submit a pull request to [the canonical repo](https://github.com/uor/angular-g11n).
