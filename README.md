# grunt-webapp
[![Build Status](https://travis-ci.org/freaktechnik/grunt-webapp.svg?branch=master)](https://travis-ci.org/freaktechnik/grunt-webapp)

> Generate webapp manifests with grunt. It takes as much information as possible from your package.json file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-webapp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-webapp');
```

## The "webapp" task

### Overview
In your project's Gruntfile, add a section named `webapp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  webapp: {
    options: {
      localeDir: 'locale',
      target: 'web'
    },
    your_target: {
      'manifest.webapp': 'dist/manifest.webapp'
    },
  },
});
```

### Options

#### options.localeDir
Type: `String`
Default value: `''`

The directory containing localizations for the webapp manifest with a subdirectory
per language, each containing a "manifest.json" with the two properties `name`
and `description`. If not specified, the locale property of the webapp manifest
will remain untouched.

#### options.target
Type: `String`
Default value: `'web'`

This should either be set to `'web'` or `'packaged'`. If set to `'packaged'`,
the `appcache_path` property is removed if it exists.

#### options.icons
Type: `String`
Default value: `'images/icon-*.png'`

Icon files pattern to use in the icons property

#### options.iconsTarget
Type: `String`
Default value: `''`

Icon URL pattern to use in the manifest, if you move your icon files around.
You can use a {size} placeholder, which will be replaced with the icon's size.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  webapp: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  webapp: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
