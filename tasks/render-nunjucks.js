/*
 * grunt-render-nunjucks
 * https://github.com/jsfi/grunt-render-nunjucks
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');

const defaultOptions = {
    data: {},
    layoutDir: false,
    partialDir: false,
    baseDir: process.cwd(),
    noCache: false,
    cacheFile: path.dirname(__dirname) + '/cache.json',
    configureRenderer: false,
    removeTrailingWhitespace: true,
    removeEmptyLines: 'multiple'
};

module.exports = function(grunt) {
    grunt.registerMultiTask('renderNunjucks', 'render your nunjucks-templates', function() {
        let done = this.async();
        let options = this.options(defaultOptions);

        //render-nunjucks:target:no-cache
        if (this.flags['no-cache']) {
            options.noCache = true;
        }

        if (!this.files.length) {
            grunt.log.verbose.error('No files specified.');
            return done();
        }

        //cache only prevents unnecessary file-writes
        const data = require('../lib/data')(grunt, options);
        const cache = require('../lib/cache')(grunt, options);
        const render = require('../lib/renderer')(grunt, options);
        const files = require('../lib/files')(grunt, options, cache, render);

        data.get(this.files)
            .then(files.process)
            .then(done)
            .catch(err => {
                grunt.log.writeln(err);
                done(false);
            });
    });
};
