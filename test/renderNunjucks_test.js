'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.nunjucks = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },

    dataObj: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/dataObj/test.html');
        var expected = grunt.file.read('test/expected/test.html');
        test.equal(actual, expected, 'data from obj');

        test.done();
    },

    dataJson: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/dataJson/test.html');
        var expected = grunt.file.read('test/expected/test.html');
        test.equal(actual, expected, 'data from json');

        test.done();
    },

    dataYml: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/dataYml/test.html');
        var expected = grunt.file.read('test/expected/test.html');
        test.equal(actual, expected, 'data from yml');

        test.done();
    },

    dataFunc: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/dataFunc/test.html');
        var expected = grunt.file.read('test/expected/test.html');
        test.equal(actual, expected, 'data from function');

        test.done();
    },

    dataEnv: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/dataEnv/test.html');
        var expected = grunt.file.read('test/expected/test.html');
        test.equal(actual, expected, 'data from environment');

        test.done();
    }
};
