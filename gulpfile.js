var gulp = require('gulp');
var karma = require('karma').Server;

gulp.task('testKarma', function(done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
    }, done).start();
})