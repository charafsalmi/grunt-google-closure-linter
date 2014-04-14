module.exports = function(grunt) {
    var path = require('path');
    var version = grunt.template.today("yyyymmddHHMM");

    // Load every grunt module. No need to add it manually.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        gjslint : {
            all : {
                src : ['./public/src/js/'+JSDir+'/**/*.js'],
                cmd: '../../closure_linter/gjslint.py'
            },
            watch : {
                src : ['./public/src/js/'+JSDir+'/**/*.js'],
            },
            options : {
                flagfile: '../../.gjslint'
            },
        },

        fixjsstyle : {
            all : {
                src : ['./public/src/js/'+JSDir+'/**/*.js'],
                cmd: '../../closure_linter/fixjsstyle.py'
            },
            watch : {
                src : ['./public/src/js/'+JSDir+'/**/*.js'],
            },
            options : {
                flagfile: '../../.fixjsstyle'
            }
        },

        // If one of the following matching files is edited, this will build what needs to be built
        watch : {
            // If the grunt file is modified, rebuild all
            rebuild: {
                files: ["Gruntfile.js"],
                tasks: ["build"]
            },
            // If one of the jsfile is modifyed, refix them all
            fixjsstyle : {
                files : ['./public/src/js/'+JSDir+'/**/*.js'],
                tasks : ['fixjsstyle:all'],
                options: {
                    interrupt: true,
                },
            },
        },

        // Empty the dst folder before a fresh new build
        clean: {
            dst: ['./temp', './public/dst/*', './public/src/img/sprites-*.png'],
            temp: ['./temp', './public/src/img/sprites-*.png']
        },
    });
};
