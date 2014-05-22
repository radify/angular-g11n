angular-g11n
============

[![Build Status](https://travis-ci.org/uor/angular-g11n.svg?branch=initial)](https://travis-ci.org/uor/angular-g11n)

Simple globalization (internationalization + localization) for AngularJS. Developed by [Radify](http://radify.io). Allows you to manage your g11n in simple JSON format and to switch languages on the fly.

# Quickstart

Install into your project. You can clone it or do it as a submodule but the easiest way is to user Bower to manage your dependencies:

```bash
bower install angular-g11n
```

Then, include it on your page:

```html
<script src="bower_components/angular-g11n/src/angular-g11n.js"></script>
```

In your app.js (or whatever you use to define your application), load the `ur.g11n` module:

```javascript
'use strict';

var app = angular.module('sampleApp', [
    'ur.g11n'
]);

app.run(function(Locale) {
    Locale.set('en', {
        "lead-copy": "Simple Translations for AngularJS"
    });
    Locale.set('izzle', {
        "lead-copy": "Sizzle Trizzle for Angulizzle "
    });

    Locale.uses('en');
});
```

Now, in your templates, you have a 't' helper, so you might include something like:

```html
<div class="jumbotron">
  <h1>angular-g11n</h1>
  <p class="lead">
    {{ 'lead-copy' | t }}
  </p>
</div>
```

Try changing the Locale.uses line to:

```javascript
// ...
    Locale.uses('izzle');
});
```

Then reload the page and refresh the page. You'll see the copy has changed!

# Documentation

This page is just to get you started, for more detail, see the pages below:

[manual.md](docs/manual.md) - a full guide to using angular-g11n.

[API.md](docs/API.md) - details of the methods available in the angular-g11n API.

[LICENSE](LICENSE) - terms and conditions.

[CONTRIBUTING.md](CONTRIBUTING.md) - guide to contributing to angular-g11n.