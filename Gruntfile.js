module.exports = function(grunt){

  grunt.initConfig({
      compass: {
        dist: {
          options: {
            sassDir: './app/src/scss',
            cssDir: './app/dist'
          }
        }
      },
      watch: {
        files: "./app/src/scss/*.scss",
        tasks: ['compass']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch'])

}
