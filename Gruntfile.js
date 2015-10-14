/*
 * grunt-render-nunjucks
 * https://github.com/jsfi/grunt-render-nunjucks
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        eslint: {
            target: ['tasks/*.js', 'lib/*.js']
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        renderNunjucks: {
            options: {
                noCache: true
            },

            dataObj: {
                options: {
                    data: {
                        title: 'Title',
                        main: 'Main',
                        footer: 'Footer'
                    },
                    layoutDir: 'test/fixtures/layouts',
                    partialDir: 'test/fixtures/partials'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'test/fixtures/templates',
                        src: ['**/*.*'],
                        dest: 'tmp/dataObj'
                    }
                ]
            },

            dataJson: {
                options: {
                    data: 'test/fixtures/data/data.json',
                    layoutDir: 'test/fixtures/layouts',
                    partialDir: 'test/fixtures/partials'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'test/fixtures/templates',
                        src: ['**/*.*'],
                        dest: 'tmp/dataJson'
                    }
                ]
            },

            dataYml: {
                options: {
                    data: 'test/fixtures/data/data.yml',
                    layoutDir: 'test/fixtures/layouts',
                    partialDir: 'test/fixtures/partials'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'test/fixtures/templates',
                        src: ['**/*.*'],
                        dest: 'tmp/dataYml'
                    }
                ]
            },

            dataFunc: {
                options: {
                    data: function(resolve) {
                        resolve({
                            title: 'Title',
                            main: 'Main',
                            footer: 'Footer'
                        });
                    },
                    layoutDir: 'test/fixtures/layouts',
                    partialDir: 'test/fixtures/partials'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'test/fixtures/templates',
                        src: ['**/*.*'],
                        dest: 'tmp/dataFunc'
                    }
                ]
            },

            dataEnv: {
                options: {
                    configureRenderer: function(env) {
                        env.addGlobal('title', 'Title');
                        env.addGlobal('main', 'Main');
                        env.addGlobal('footer', 'Footer');
                    },
                    layoutDir: 'test/fixtures/layouts',
                    partialDir: 'test/fixtures/partials'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'test/fixtures/templates',
                        src: ['**/*.*'],
                        dest: 'tmp/dataEnv'
                    }
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'renderNunjucks', 'nodeunit']);
    grunt.registerTask('default', ['eslint', 'test']);

};
