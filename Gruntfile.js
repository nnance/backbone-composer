/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      options : {
        helpers : 'spec/javascripts/helpers/*.js',
        specs : 'spec/javascripts/**/*.spec.js',
        vendor : [
          'public/javascripts/jquery.js',
          'public/javascripts/json2.js',
          'public/javascripts/underscore.js',
          'public/javascripts/backbone.js'
        ],
      },
      babysitter : {
        src : ['src/*.js']
      }
    },

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      babysitter : [ 'backbone.viewmanager.js' ]
    },

    watch: {
      babysitter : {
        files : ['src/*.js', 'spec/**/*.js'],
        tasks : ['jshint', 'jasmine:babysitter']
      },
      server : {
        files : ['src/*.js', 'spec/**/*.js'],
        tasks : ['jasmine:babysitter:build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'jasmine:babysitter']);

  grunt.registerTask('dev', ['test', 'watch:babysitter']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine:babysitter', 'preprocess', 'template', 'concat', 'uglify']);

};
