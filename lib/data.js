/*
 * grunt-render-nunjucks
 * https://github.com/jsfi/grunt-render-nunjucks
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

 const _ = require('lodash');

module.exports = function(grunt, options) {

    return {
        get: get
    };

    function get(files) {
        return load()
            .then(merge(files));
    }

    function merge(files) {
        return function(data) {
            return files.map(function(filePair) {
                filePair.data = getTmplData(data, filePair);
                return filePair;
            });
        };
    }

    function load() {
        let data = options.data;
        return new Promise(function(resolve, reject) {
            if (_.isString(data)) {
                if (data.match(/.json$/)) {
                    data = grunt.file.readJSON(data);
                } else if (data.match(/.ya?ml$/)) {
                    data = grunt.file.readYAML(data);
                }
            }

            if (_.isFunction(data)) {
                data(resolve, reject);
            } else {
                resolve(data);
            }
        });
    }

    function getTmplData(data, filePair) {
        //key is path to file from working-directory
        let key = filePair.src[0].replace(new RegExp('^' + filePair.orig.cwd), '');

        if (_.startsWith(key, '/')) {
            key = key.substr(1);
        }

        //merge global data with page data
        if (data && data.pages && data.pages[key]) {
            return _.defaultsDeep({}, data.pages[key], data);
        } else {
            return data;
        }
    }
};
