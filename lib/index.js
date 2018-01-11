'use strict';
const path = require('path');
const fs = require('fs');

const vendor = path.resolve(__dirname, '../vendor');

const dataBindingLocation = (function(){
	if(process.platform === 'linux'){
		return path.resolve(vendor,'linux',process.arch,'pngquant');
	} else if(process.platform === 'darwin'){
		return path.resolve(vendor,'macos/pngquant');
	} else {
		return path.resolve(vendor,'win/pngquant');
	}
})();
const dest = path.resolve(vendor,'pngquant', process.platform === 'win32' ? '.exe' : '');

if(!fs.existsSync(vendor)){
	fs.mkdirSync(vendor);
}

fs.createReadStream(dataBindingLocation).pipe(fs.createWriteStream(dest,{
	mode: 755,
	autoClose: true
}));

module.exports = {
	path: function(){
		return dest;
	},
	run: function(opts,callback){
		fs.stat(dest,callback);
	}
}


// 'use strict';
// const path = require('path');
// const BinWrapper = require('bin-wrapper');
// const pkg = require('../package.json');

// const url = `https://raw.github.com/imagemin/pngquant-bin/v${pkg.version}/vendor/`;

// module.exports = new BinWrapper()
// 	.src(`${url}macos/pngquant`, 'darwin')
// 	.src(`${url}linux/x86/pngquant`, 'linux', 'x86')
// 	.src(`${url}linux/x64/pngquant`, 'linux', 'x64')
// 	.src(`${url}freebsd/x64/pngquant`, 'freebsd', 'x64')
// 	.src(`${url}win/pngquant.exe`, 'win32')
// 	.dest(path.resolve(__dirname, '../vendor'))
// 	.use(process.platform === 'win32' ? 'pngquant.exe' : 'pngquant');
