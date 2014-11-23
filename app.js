'use strict'

var jsdom = require('jsdom');

function readFromUrl(url, cb){
	jsdom.env(url, function (errors, window) {
		if (!errors) {
			var manset = window.document.querySelector('#manset');
			if (!manset) {
				process.stderr.write('Manset not found' + '\n');
				process.exit(1);
			}
			var text = manset.querySelector('div').textContent.trim().replace(/''/g, '"');
			var next = manset.querySelector('div').querySelector('a').href;
			cb({
				text: text,
				next: next
			})
		}
		else{
			cb();			
		}
	})
}

var next = 'http://www.zaytung.com/sondakikadetay.asp';
var iterCount = 1;
var isTTY = process.stdin.isTTY && process.stdout.isTTY;
var processReports = !isTTY && process.stderr.isTTY;

if (process.argv.length >= 3) {
	iterCount = process.argv[2];
}

function readWriteCycle(){
	var count = iterCount;
	(function doRead() {
		var x = readFromUrl(next, function (x) {
			if (x && x.text) {
				process.stdout.write(x.text + '\n');
				next = x.next;
				if (--count && next) {
					doRead();
				}
				if (processReports) {
					process.stderr.write('\rWrote ' + (iterCount - count) + '/' + iterCount);
					if (!count) {
						process.stderr.write('\n');
					}
				}
			}
		});
	})();
}

if (isTTY) {
	readWriteCycle();
	process.stdin.resume();
}
process.stdin.on('readable', function() {
	readWriteCycle();
});