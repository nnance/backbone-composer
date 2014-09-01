/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      options : {
        //helpers : 'spec/javascripts/helpers/*.js',
        specs : 'test/*.js',
        vendor : [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/underscore/underscore.js',
          'node_modules/backbone/backbone.js'
        ],
        keepRunner: false
      },
      plugin : {
        src : ['backbone.viewmanager.js']
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
        files : ['src/*.js', 'spec/**/*.js'],
        tasks : ['jshint', 'jasmine:plugin']
      },
      server : {
        files : ['src/*.js', 'spec/**/*.js'],
        tasks : ['jasmine:plugin:build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'jasmine:plugin']);

  grunt.registerTask('dev', ['test', 'watch:plugin']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine:plugin', 'preprocess', 'template', 'concat', 'uglify']);

};
