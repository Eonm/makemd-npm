'use strict';

var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

var bin = new BinWrapper({ global: false })
	.src('https://github.com/Eonm/makemd-rs/releases/download/0.1.1/makemd-rs', 'linux', 'x64')
	.src('https://github.com/Eonm/makemd-rs/releases/download/0.1.1/makemd-rs.exe', 'win32')
	.dest(path.join(__dirname, 'vendor'))
	.use(process.platform === 'win32' ? 'makemd-rs.exe' : 'makemd-rs');


fs.exists(bin.path(), function (exists) {
	if (!exists) {
		console.log(chalk.yellow('⧗ Downloading MakeMD (~5-8MB depending on OS).'));
		bin.run(['--version'], function (err) {
			if (err) {
				console.log(chalk.red("⚠ No binary file found four your platform ⚠"));
			} else {
				console.log(chalk.green('✓ pre-build test passed successfully'));
			}
		});
	}
});


module.exports.path = bin.path();
