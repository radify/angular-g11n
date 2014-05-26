# Managing g11n as CSV

Although working with JSON is fine for most people, you may wish to manage your g11n as CSV. This has the following benefits:

* You can see different locales side-by-side
* You could send the CSV to a client to enter their copy without them needing to grok JSON

Therefore, we have provided two Gulp tasks to do this: `export` and `import`. You must keep all your json g11n files in the same directory, and our tasks will take care of converting them to and from JSON.

## Exporting to CSV

### Custom input directory

By default we're looking for translations files in './docs/sample/app/catalogs'. You can tell it where to look:

```bash
node_modules/gulp/bin/gulp.js export --inputDirectory=/var/www/my-app/app/js/catalogs
```

### Custom language list

By default, it looks for en only.

```bash
node_modules/gulp/bin/gulp.js export --langs=en,izzle
```

### Custom output file

By default, `export` will create g11n.csv. You can customise this:

```bash
node_modules/gulp/bin/gulp.js export  --outfile=/home/buddy/my-translations.csv
```

### Custom canonical language

You have to set one language as canonical - that is, the reference language. By default, this is 'en', but you can change it:

```bash
node_modules/gulp/bin/gulp.js export  --canonical=es
```

## Importing back from the CSV

Once your CSV has been updated, you can import it back in to overwrite your JSON.

```bash
node_modules/gulp/bin/gulp.js import
```

### Customising languages

```bash
node_modules/gulp/bin/gulp.js import --langs=en,izzle
```

### Customising the input file

By default, it will import from `g11n.csv`, but if you've called the file something else, you can use that instead:

```bash
node_modules/gulp/bin/gulp.js import --infile=foo.csv
```

### Customising the output directory

By default, it will write to

```bash
node_modules/gulp/bin/gulp.js import --catalogDirectory=docs
```
