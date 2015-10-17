# grunt-render-nunjucks

> Compile nunjucks-templates to static files

![dependencies](https://david-dm.org/jsfi/grunt-render-nunjucks.svg)

## Getting Started
This plugin requires Grunt `~0.4.0` and node `>=4.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-render-nunjucks --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-render-nunjucks');
```

## The "renderNunjucks" task

### Overview
In your project's Gruntfile, add a section named `renderNunjucks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    renderNunjucks: {
        options: {
            //Task-specific options go here.
        },
        targetName: {
            options: {
                //Target-specific options go here.
            },
            files: {
                //Target-specific file list
            }
        }
    }
});
```

### Options

#### options.data
Type: `Object`
Default value: `{}`

This configures the data that will be available in the template. It is possible to pass an object, a JSON-file, a YAML-file or a function that can be asynchronous.

```js
data: {}, //object
data: 'data.json', //JSON
data: 'data.yml', //YAML
data: function(resolve, reject) {
    resolve({});
}
```

#### options.layoutDir
Type: `String`
Default value: `false`

This configures the relative path of the layout templates. e.g. `src/views/layouts`

If this value is set a filter will be available in the templates  to load layouts from the configured directory.

`{% extends "default.html" | layout %}`

#### options.partialDir
Type: `String`
Default value: `false`

This configures the relative path of the partial templates. e.g. `src/views/partials`

If this value is set a filter will be available in the templates  to load partials from the configured directory:

`{% include "item.html" | partial %}`

#### options.baseDir
Type: `String`
Default value: `process.cwd()`

This configures the absolute path of your project. It is used for the layout and partial filter.

#### options.noCache
Type `Boolean`
Default value: `false`

If this option is true the cache-hashes will be ignored and all templates will be written to the file system.

Can be set with a flag: `grunt renderNunjucks:targetName:no-cache`

#### options.cacheFile
Type: `String`
Default value: `path.dirname(__dirname) + '/cache.json'`

This configures the file the cached hashes are written into. The default is inside the grunt-render-nunjucks directory.

#### options.configureRenderer
Type: `Function`
Default value: `false`

This function exposes the [nunjucks render environment](https://mozilla.github.io/nunjucks/api.html#environment) for configuration.
```js
configureRenderer: function(env) {
    env.addGlobal('currentYear', (new Date()).getFullYear());

    env.addFilter('shorten', function(str, count) {
        return str.slice(0, count || 5);
    });
}
```

#### options.removeTrailingWhitespace
Type: `Boolean`
Default value: `true`

This beautifies the output by removing trailing white spaces.

#### options.removeEmptyLines
Type: `Boolean`
Default value: `'multiple'`

This beautifies the output by removing empty lines. A special case is the value `multiple`. This value merges multiple empty lines into one.

### Usage Examples

#### Minimal Options

```js
grunt.initConfig({
    renderNunjucks: {
        files: [
            {
                expand: true,
                cwd: 'src/views/templates',
                src: ['**/*.*'],
                dest: 'build'
            }
        ]
    }
});
```

#### Custom Options

```js
grunt.initConfig({
    renderNunjucks: {
        options: {
            layoutDir: 'src/views/layouts',
            partialDir: 'src/views/partials'
        },
        dist: {
            options: {
                data: 'src/data.json',
                configureRenderer: function(env) {
                    env.addGlobal('currentYear', (new Date()).getFullYear());
                }
            },
            files: [
                {
                    expand: true,
                    cwd: 'src/views/templates',
                    src: ['**/*.*'],
                    dest: 'build'
                }
            ]
        }
    }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
