/**
 * @param {*} grunt
 */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      all: {
        src: '<%= target %>'
      },
      watch: {
        src: '<%= grunt.regarde.changed %>'
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    gjslint: {
      all: {
        cmd: '<%= gjslint.cmd %>',
        src: '<%= target %>'
      },
      watch: {
        cmd: '<%= gjslint.cmd %>',
        src: '<%= grunt.regarde.changed %>'
      },
      options: {
        flagfile: '.gjslint'
      },
      cmd: './closure_linter/gjslint.py'
    },
    fixjsstyle: {
      all: {
        cmd: '<%= fixjsstyle.cmd %>',
        src: '<%= target %>'
      },
      options: {
        flagfile: '.fixjsstyle'
      },
      cmd: './closure_linter/fixjsstyle.py'
    },
    watch: {
      js: {
        files: '<%= target %>',
        tasks: ['notify_hooks', 'eatwarnings', 'jshint:watch', 'gjslint:watch']
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        title: ''
      }
    },
    target: ['Gruntfile.js', 'js/**/*.js', 'tasks/**/*.js', '!js/ignoreme.js', '!**/ignoreme/**']
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-notify');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('default', ['jshint:all', 'gjslint:all']);
  grunt.registerTask('eatwarnings', function() {
    process.exit = function() {};
  });

};
