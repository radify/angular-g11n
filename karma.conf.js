module.exports = function(config) {
	config.set({
		exclude: [],
		frameworks: ['jasmine'],
		autoWatch: false,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};

