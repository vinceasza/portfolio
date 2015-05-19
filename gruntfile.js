module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/js/*.js',
        dest: 'scripts.min.js'
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          preserveComments: 'all'
        },
        src: 'src/js/*.js',
        dest: 'scripts.min.js'
      }
    },
    autoprefixer: {
      dev: {
        files: {
          'css/main.css' : 'css/main.css'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['index.html']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass:dev']
      },
      style: {
        files: ['css/*.css'],
        tasks: ['autoprefixer:dev']
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'css/main.css' : 'css/main.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/main.css' : 'css/main.scss'
        }
      }
    },


  });
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch'); //grunt watch
  grunt.loadNpmTasks('grunt-sass');
  //runs with grunt
  grunt.registerTask('default', ['uglify:dev', 'sass:dev', 'autoprefixer:dev']);
  grunt.registerTask('build', ['uglify:build', 'sass:build']);


};
