var assert = require('assert');
const fs = require('fs')
var HeightMap = require('./HeightMap.ts')

describe('HeightMap', function() {

	var heightMap: HeightMap;
	var lines: Array<string>

	beforeEach(function(done) {
		fs.readFile('test-input.txt', 'utf8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}

			lines = data.split(/\r?\n/).map(line => line.trim());
			done()
		})
	
  });
	
	it('reads input and determines answer', function(done) {
		heightMap = new HeightMap(lines);
		assert.equal(heightMap.answer, 195)
		done()
	})
});