var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var jasmine = require('gulp-jasmine');

var exporter = require('./util/export-catalog');
var importer = require('./util/import-catalog');

var testFiles = [ // TODO remove?
	'bower_components/angular/angular.js',
	'bower_components/angular-mocks/angular-mocks.js',
	'src/*.js',
	'spec/*.js'
];

gulp.task('export', function() {
    exporter.run();
});

gulp.task('import', function() {
    importer.run();
});

// tun tests once
gulp.task('test', function() {
	return gulp.src(testFiles)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err) {
			// failed tests cause gulp to exit non-zero
			throw err;
		})
		.pipe(jasmine());
});

// continuously run tests on change
gulp.task('watch', function() {
	gulp.src(testFiles)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}));
});

gulp.task('lint', function() {
	return gulp.src('./src/*.js')
		.pipe(jshint({
			newcap: false
		}))
		.pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'test']);
gulp.task('ci', ['lint', 'test']);