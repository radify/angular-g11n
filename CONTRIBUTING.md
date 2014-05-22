# Contributing

If you want to contribute to the angular-g11n project, please feel free! Install all the developer dependencies with:

```bash
npm install
bower install --dev
```

We have several Gulp tasks that can help you:

## Running the tests

Testing uses [Jasmine](http://jasmine.github.io/), [Karma](http://karma-runner.github.io/0.12/index.html), [PhantomJS](http://phantomjs.org/) and [Gulp](http://gulpjs.com/). All these are installed when you do an `npm install --dev`. You can run the tests with:

```bash
bin/test
```

If you run the watch task, it will run the tests in 'watch' mode, so it'll run on any change you make:

```bash
node_modules/gulp/bin/gulp.js watch
```

## Linting the code

```bash
node_modules/gulp/bin/gulp.js lint
```

## Submitting your changes

Simply push your changes to a branch on your repository and submit a pull request to [the canonical repo](https://github.com/uor/angular-g11n).

# Documentation

[README.md](README.md) - overview and quickstart guide.

[manual.md](docs/manual.md) - a full guide to using angular-g11n.

[API.md](docs/API.md) - details of the methods available in the angular-g11n API.

[LICENSE](LICENSE) - terms and conditions.
