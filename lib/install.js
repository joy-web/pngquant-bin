'use strict';
const binBuild = require('bin-build');
const logalot = require('logalot');
const path = require('path');
const bin = require('.');

bin.run(['--version'], err => {
	if (err) {
		logalot.warn(err.message);
		logalot.warn('pngquant pre-build test failed');
		logalot.info('compiling from source');

		const libpng = process.platform === 'darwin' ? 'libpng' : 'libpng-dev';

		binBuild.file(path.resovle(__dirname,'vendor/pngquant-2.10.1-src.tar.gz'), [
			'rm ./INSTALL',
			`./configure --prefix="${bin.dest()}"`,
			`make install BINPREFIX="${bin.dest()}"`
		])
			.then(() => {
				logalot.success('pngquant built successfully');
			})
			.catch(err => {
				err.message = `pngquant failed to build, make sure that ${libpng} is installed`;
				logalot.error(err.stack);
			});
	}

	logalot.success('pngquant pre-build test passed successfully');
});
