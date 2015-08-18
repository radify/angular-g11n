angular-g11n
============

[ ![Travis Status for radify/angular-g11n](https://travis-ci.org/radify/angular-g11n.svg)](https://travis-ci.org/radify/angular-g11n)
[ ![Bower version](https://badge.fury.io/bo/angular-g11n.svg)](http://badge.fury.io/bo/angular-g11n)
[ ![Dependencies Status](https://david-dm.org/radify/angular-g11n.svg)](https://david-dm.org/radify/angular-g11n.svg)

Simple globalization (internationalization + localization) for AngularJS. Developed by [Radify](http://radify.io). Allows you to manage your g11n in simple JSON format and to switch languages on the fly. Also supports CSV import/export as a Gulp task.

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

Then refresh the page. You'll see the copy has changed!

# Documentation

This page is just to get you started, for more detail, see the pages below:

[manual.md](docs/manual.md) - a full guide to using angular-g11n.

[API.md](docs/API.md) - details of the methods available in the angular-g11n API.

[managing-g11n-as-csv.md](docs/managing-g11n-as-csv.md) - you can manage g11n using CSV files if JSON doesn't suit you.

[LICENSE](LICENSE) - terms and conditions.

[CONTRIBUTING.md](CONTRIBUTING.md) - guide to contributing to angular-g11n.
