var gutil = require('gulp-util');
var gulp = require('gulp');
var fs = require('fs');
var args = require('yargs').argv;
var convert = require('gulp-convert');

var infile = args.infile ? args.infile : 'g11n.csv';

/**
 * Gulp plugin that can import JSON g11n files from a CSV
 */
function importer() {
    var catalogDirectory = args.outputDirectory ? args.outputDirectory : process.cwd() + '/docs/sample/app/catalogs';
    var langs = args.langs ? args.langs.split(',') : ['en'];

    gulp.src([infile])
        .pipe(convert({
            from: 'csv',
            to: 'json'
        }))
        .pipe(gulp.dest('.'));

    // convert to JSON first, then the CSV can be read in
    gutil.log("Open " + process.cwd() + '/' + infile);
    var jsonFile = infile.replace('.csv', '.json');

    var file = require( process.cwd() + '/' + jsonFile);

    function dirty(val) {
        return val.replace(/&quot;/, '\n');
    }

    for (var j = 0; j < langs.length; j++) {
        var lang = langs[j];
        var output = {};
        for (var i = 0 ; i < file.length; i++) {
            var key = file[i].Key;
            var value = file[i][lang];
            if (key.substr(-2) === '__') {
                var partialKey = key.substr(key.lastIndexOf('.') + 1).replace('__', '');
                key = key.substr(0, key.lastIndexOf('.'));
                if (typeof output[key] !== 'object') {
                    output[key] = {};
                }
                output[key][partialKey] = dirty(value);
            } else {
                output[key] = dirty(value);
            }
        }

        var outfile = catalogDirectory + '/lang-' + lang + '.json';
        gutil.log('Writing g11n file to ' + outfile + '...');
        fs.writeFile(outfile, JSON.stringify(output, null, '\t'), function(err) {
            if(err) {
                gutil.log(err);
            }
        });
    }

    gutil.log("All done! Run git diff to see what files have changed. Please check changes carefully.");
}

// Exporting the plugin main function
module.exports = {
    run: function() {
        gulp.src([infile])
            .pipe(convert({
                from: 'csv',
                to: 'json'
            }))
            .pipe(gulp.dest('.'))
            .on('close', importer);
    }
};
