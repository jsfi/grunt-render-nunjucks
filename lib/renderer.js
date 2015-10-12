/*
 * grunt-render-nunjucks
 * https://github.com/jsfi/grunt-render-nunjucks
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');
const promisify = require('es6-promisify');
const nunjucks = require('nunjucks');
const loaders = require('nunjucks/src/loaders');
const _ = require('lodash');

module.exports = function(grunt, options) {
    return promisify(getRenderFn());

    function getRenderFn() {
        let env = initEnvironment();

        return env.render.bind(env);
    }

    function initEnvironment() {
        let env = new nunjucks.Environment(new loaders.FileSystemLoader());

        if (_.isFunction(options.configureRenderer)) {
            options.configureRenderer(env);
        }

        addFilters(env);

        return env;
    }

    function addFilters(env) {
        if (_.isString(options.layoutDir)) {
            addFileFilter(env, 'layout', options.layoutDir, options.baseDir);
        }

        if (_.isString(options.partialDir)) {
            addFileFilter(env, 'partial', options.partialDir, options.baseDir);
        }
    }

    function addFileFilter(env, filter, filterDir, baseDir) {
        if (!_.startsWith(filterDir, '/')) {
            filterDir = path.join(baseDir, filterDir);
        }

        env.addFilter(filter, function(file) {
            return path.join(filterDir, file);
        });
    }
};
