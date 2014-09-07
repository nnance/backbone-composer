/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    mocha_phantomjs: {
      options: {
        reporter: "spec"
      },
      plugin: {
        files: {
          src: ['test/spec.html']
        }
      }
    },

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      plugin : [ 'backbone.viewmanager.js' ]
    },

    watch: {
      plugin : {
        files : ['backbone.viewmanager.js', 'test/**/*.js', 'test/spec.html'],
        tasks : ['jshint', 'mocha_phantomjs:plugin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'mocha_phantomjs:plugin']);

  grunt.registerTask('dev', ['test', 'watch:plugin']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'mocha_phantomjs:plugin', 'preprocess', 'template', 'concat', 'uglify']);

};
