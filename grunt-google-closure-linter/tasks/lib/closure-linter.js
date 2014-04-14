(function (exports) {
    'use strict';
    var fs = require('fs');
    var grunt = require('grunt');
    /**
     * @param {Object} options
     * @param {Array.<string>} files
     * @return {Array.<string>}
     */
    var gatherArguments = function (options, files) {
        var args = options.args || [];
        if (options.flagfile) {
            args.push('--flagfile');
            args.push(__dirname + '/' + options.flagfile);
        }
        return grunt.util._.union(args, files);
    };
    /**
     * @param {Object} task
     * @param {function(Object, Object, number)} callback
     */
    exports.run = function (task, callback) {
        var done = task.async();
        var files = task.filesSrc;
        var args = gatherArguments(task.options(), files);
        grunt.verbose.writeln('cmd: ' + task.data.cmd);
        grunt.verbose.writeln('args: ', args.join(' '));
        var exec = require('child_process').exec;
        var child = null;
        child = exec(
            __dirname + '/' + task.data.cmd + ' ' + args.join(' '),
            function (error, stdout, stderr) {
                console.log(__dirname + '/' + task.data.cmd + ' ' + args.join(' '))
                if (error !== null) {
                    grunt.fail.warn(stderr);
                    grunt.fail.warn(stdout);
                } else {
                    grunt.log.ok(stdout);
                }
            }, {
                encoding: 'utf8',
                timeout: 0,
                maxBuffer: 20000000 * 1024,
                killSignal: 'SIGTERM',
                cwd: null,
                env: null
            }
        );
    };
})(typeof exports === 'object' && exports || this);