/*
 * grunt-webapp
 * https://github.com/freaktechnik/grunt-webapp
 *
 * Copyright (c) 2015 Martin Giger
 * Licensed under the MPL-2.0 license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('webapp', 'Generate webapp manifests with grunt', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          localeDir: '',
          target: 'web'
        });

        var pkg = grunt.file.readJSON('package.json');

        var locales = {};
        if(options.localeDir) {
            grunt.file.expand(options.localeDir+'/*/manifest.json').forEach(function(filepath) {
                var lang = filepath.match(new RegExp(options.localeDir+"\/([^\/]+)\/"))[1];
                locales[lang] = grunt.file.readJSON(filepath);
            });
        }

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else if(!filepath.match(/\.webapp$/)) {
                    grunt.log.warn('Source file "'+ filepath + '" is not a webapp manifest');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                  // Read file source.
                  return grunt.file.readJSON(filepath);
            }).forEach(function(manifest) {
                manifest.name = pkg.name;
                manifest.version = pkg.version;
                if("description" in pkg) {
                    manifest.description = pkg.description;
                }
                if("author" in pkg) {
                    manifest.developer = {};
                    if("name" in pkg.author) {
                        manifest.developer.name = pkg.author.name;
                        if("url" in pkg.author) {
                            manifest.developer.url = pkg.author.url;
                        }
                    }
                    else {
                        // Parse the author shorthand
                        var developer = pkg.author.match(/^([^\(<]+)/);
                        var url = pkg.author.match(/\(([^\)]+)\)/);

                        manifest.developer.name = developer[1];
                        if(url) {
                            manifest.developer.url = url;
                        }
                    }
                }

                if(options.localeDir) {
                    manifest.locales = locales;
                }

                // Appcache paths are forbidden in packaged manifests
                if(options.target === 'packaged' && "appcache_path" in manifest) {
                    delete manifest.appcache_path;
                }

                // Packaged apps need a launch path
                if(options.target === 'pakaged' && !("launch_path" in manifest)) {
                    grunt.log.warn('No launch path specified in manifest');
                }

                grunt.file.write(f.dest, JSON.stringify(manifest));

                grunt.log.ok('Webapp manifest "' + f.dest +'" written');
            });
        });
    });
};
