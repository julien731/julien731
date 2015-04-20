module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/*.js'],
                dest: 'js/dist.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/dist.js',
                dest: 'js/dist.js'
            }
        }
    });

    // Load all the tasks
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};