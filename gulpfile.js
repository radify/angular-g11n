var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var Server = require('karma').Server;

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

gulp.task('test', function(cb) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
    ,singleRun: true
  }, cb).start();
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
