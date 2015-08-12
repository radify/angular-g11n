module.exports = function(config) {
	config.set({

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/*.js',
        'spec/*.js'
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

		exclude: [],
		frameworks: ['jasmine'],
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};

