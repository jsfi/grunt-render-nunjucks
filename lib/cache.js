/*
 * grunt-render-nunjucks
 * https://github.com/jsfi/grunt-render-nunjucks
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const crypto = require('crypto');

module.exports = function(grunt, options) {
    let cache = {};
    let cacheFile = options.cacheFile;

    if (!options.noCache && grunt.file.exists(cacheFile)) {
        try {
            cache = grunt.file.readJSON(cacheFile);
        } catch(err) {
            grunt.verbose.error(`Cache "${cacheFile}" was not valid.`);
        }
    }

    return {
        changed: changed,
        write: write
    };

    function changed(file, output) {
        let hash = crypto.createHash('md5').update(output).digest('hex');

        if (cache[file] && cache[file] === hash) {
            return false;
        }

        cache[file] = hash;
        return true;
    }

    function write() {
        grunt.file.write(cacheFile, JSON.stringify(cache));
    }
};
