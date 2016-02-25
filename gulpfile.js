var gulp = require('gulp');
var karma = require('karma').Server;

gulp.task('test:webpack',function(done) {
    new karma({
        configFile: __dirname + '/test/karma.webpackConf.js'
    },done).start();
});

gulp.task('test:webunit',function(done) {
    new karma({
        configFile: __dirname + '/test/karma.webTestConf.js'
    },done).start();
});

var mocha = require('gulp-mocha');

gulp.task('test:nodeunit',function(){
    return gulp.src('test/unitTest.js')
        .pipe(mocha())
        .once('end',() => {
            process.exit();
        });
});