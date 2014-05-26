# API: Technical/implementation details

angular-g11n has the concepts of catalogs. Each language has a catalog. There are two objects, `Locale` and `LocaleProvider`, plus a helper `t` that keys are piped into to display translated strings.

## Locale object

### Manually setting a catalog

```javascript
Locale.set('en', {
    'hello': 'Hello World!'
    'hello-name': 'Hello {{ name }}!'
    'hello-world': {
        0: 'Hello {{ name }} you have no friends!',
        1: 'Hello {{ name }} you have one friend!',
        n: 'Hello {{ name }} you have {{ count }} friends!'
    }
});
```

## Templates

The Locale service has the helper `t` which a key can be passed to.

```html
    <h1>{{ 'hello' | t }}</h1>
    <h1>{{ 'hello-name' | t: { name: "Angular" } }}</h1>
```

You can also perform interpolation:

 ```html
     <h1>{{ 'hello-world' | t: { name: "Angular", count: 5 } }}</h1>
```

Please see the section "Manually setting a catalog" just above to see how these strings are defined.


### Switching locale

Switch locale by the key of the catalog you want to use:

```javascript
Locale.uses('en');
```

### Getting the current locale

```javascript
var currentLocale = Locale.uses();
```

### More examples

```javascript
Locale('hello'); // Hello World!
Locale('hello-name', {name: 'Angular'}); // Hello Angular!
Locale('hello-world', {name: 'Angular', count: 5}); // Hello Angular you have 5 friends!
```

## Locale Loader

The `LocaleLoader` factory allows you to dynamically load catalogs from an URL. This can be a local file or anywhere on the Internet.

### Defining the catalog urls

First, define the catalogs:

```javascript
LocaleLoader.catalogs([
    {lang: 'en', url: '/js/catalogs/lang-en.json'},
    {lang: 'fr', url: '/js/catalogs/lang-fr.json'}
]);
```

Then, you can load them on the fly and run a promise once it's loaded:

```javascript
LocaleLoader('en').then(function(lang) {
    Locale.uses(lang);
    Locale('hello');
});
```

If it can't find the precise language code, it can fall back:

```javascript
LocaleLoader('en_US').then(function(lang) {
    Locale.uses(lang); //lang is the found one i.e 'en' here.
    Locale('hello');
});
```

# Documentation

[README.md](../README.md) - overview and quickstart guide.

[manual.md](manual.md) - a full guide to using angular-g11n.

[managing-g11n-as-csv.md](managing-g11n-as-csv.md) - you can manage g11n using CSV files if JSON doesn't suit you.

[LICENSE](../LICENSE) - terms and conditions.

[CONTRIBUTING.md](../CONTRIBUTING.md) - guide to contributing to angular-g11n.