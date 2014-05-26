var gutil = require('gulp-util');
var gulp = require('gulp');
var fs = require('fs');
var args = require('yargs').argv;

/**
 * Gulp plugin that can export JSON g11n files to a CSV
 */
function exporter() {

    // arguments
    var catalogDirectory = args.inputDirectory ? args.inputDirectory : process.cwd() + '/docs/sample/app/catalogs';
    var outfile = args.outfile ? args.outfile : 'g11n.csv';
    var canonical = args.canonical ? args.canonical : 'en';
    var langs = args.langs ? args.langs.split(',') : ['en'];

    function readJSON(file) {
        return require(catalogDirectory + '/' + file);
    }

    function getKeys(file) {
        var file = readJSON(file);
        var keys = [];
        for (var key in file) {
            if (file.hasOwnProperty(key)) {
                var val = file[key];
                if (typeof val === 'object') {
                    for(var innerKey in val) {
                        if (val.hasOwnProperty(innerKey)) {
                            keys.push(key + '.' + innerKey + '__');
                        }
                    }
                    continue;
                } else {
                    keys.push(key);
                }
            }
        }
        return keys;
    }

    function addKeysToTable(canonicalKeys) {
        var table = {};
        for (var i = 0; i < canonicalKeys.length; i++) {
            var key = canonicalKeys[i];
            table[key] = {};
        }
        return table;
    }

    function addLanguageToTable(table, canonicalKeys, langCode) {

        function clean(val) {
            return val.replace(/\"/g, '&quot;');
        }

        function processKey(key) {
            var partialKey = null;
            var baseKey = null;

            var val = file[key];

            if (key.substr(-2) === '__') {
                partialKey = key.substr(key.lastIndexOf('.') + 1).replace('__', '');
                baseKey = key.substr(0, key.lastIndexOf('.'));
                val = file[baseKey];
            }

            if (typeof val === 'undefined') {
                table[key][langCode] = '';
            } else {
                if (typeof val === 'object') {
                    for(var innerKey in val) {
                        if (val.hasOwnProperty(innerKey)) {
                            if (innerKey === partialKey) {
                                var tmpkey = baseKey + '.' + innerKey + '__';
                                table[key][langCode] = clean(val[innerKey]);
                            }
                        }
                    }
                } else {
                    table[key][langCode] = clean(val);
                }
            }
        }

        gutil.log("Reading language " + langCode + " from " + catalogDirectory + '/lang-' + langCode + '.json');
        var file = readJSON('lang-' + langCode + '.json');
        for (var i = 0; i < canonicalKeys.length; i++) {
            var key = canonicalKeys[i];
            processKey(key);
        }
    }

    // there is probably some way a million times better to do this but I couldn't get any of the fiddly libraries
    // to work
    function renderAsCSV(table, langs) {
        var string = '"Key"';

        for(var i = 0; i < langs.length; i++) {
            var lang = langs[i];
            string += ',"' + lang + '"';
        }

        for (var i = 0; i < canonicalKeys.length; i++) {
            var key = canonicalKeys[i];
            string += "\n" + '"' + key + '"';
            for(var j = 0; j < langs.length; j++) {
                var lang = langs[j];
                string += ',"' + table[key][lang] + '"';
            }
        }

        return string;
    }

    var canonicalKeys = getKeys('lang-' + canonical + '.json');
    var table = addKeysToTable(canonicalKeys);
    for(var i = 0; i < langs.length; i++) {
        var lang = langs[i];
        addLanguageToTable(table, canonicalKeys, lang);
    }

    var csv = renderAsCSV(table, langs);

    fs.writeFile(outfile, csv, function(err) {
        if(err) {
            gutil.log(err);
        } else {
            gutil.log("g11n file was saved to " + outfile);
        }
    });
}

// Exporting the plugin main function
module.exports = {
    run: exporter
};
