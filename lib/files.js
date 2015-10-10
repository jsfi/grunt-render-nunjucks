/*
 * grunt-render-nunjucks
 * https://github.com/jsfi/grunt-render-nunjucks
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt, options, cache, render) {

    return {
        process: process
    };

    function process(files) {
        return handleFiles(files)
            .then(cache.write);
    }

    function handleFiles(files) {
        return Promise.all(files.map(handleFile));
    }

    function handleFile(filePair) {
        return singleSrc(filePair)
            .then(renderTemplate)
            .then(processOutput)
            .then(output => {
                if (cache.changed(filePair.src[0], output)) {
                    grunt.file.write(filePair.dest, output);
                    grunt.log.ok(`File "${filePair.dest}" created.`);
                } else {
                    grunt.verbose.ok(`File "${filePair.dest}" is cached`);
                }
            });
    }

    function singleSrc(filePair) {
        return new Promise((resolve, reject) => {
            //only one template as source
            if (filePair.src.length !== 1) {
                reject(new Error(`Multiple template-sources for "${filePair.dest}" configured.`));
                return;
            }

            //check if source exists
            if (!grunt.file.exists(filePair.src[0])) {
                reject(new Error(`Source file "${filePair.src[0]}" not found.`));
                return;
            }

            resolve(filePair);
        });
    }

    function renderTemplate(filePair) {
        return render(filePair.src[0], filePair.data);
    }

    function processOutput(output) {
        if (options.removeEmptyLines) {
            if (options.removeEmptyLines === 'multiple') {
                output = output.replace(/^(\s*\n){2,}/gm, '\n');
            } else {
                output = output.replace(/^\s*\n/gm, '');
            }
        }

        if (options.removeTrailingWhitespace) {
            output = output.replace(/[^\S\r\n]+$/gm, '');
        }

        return output;
    }
};
