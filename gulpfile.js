var gulp        = require('gulp');
var del         = require('del');
var jshint      = require('gulp-jshint');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var karmaServer = require('karma').Server;
var wrap        = require('gulp-wrap');
var server      = require('./mock/server');
var browserify  = require('browserify');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var mockServer;

var paths = {};
    paths.dist = './dist';
    paths.src  = './src';
    paths.test = paths.src + '/spec';
    paths.libs = './node_modules';


gulp.task('clean', function(cb) {
    del(paths.dist + '/**/*', cb);
});

gulp.task('copy', ['clean'], function() {
    gulp.src([paths.src + '/manualtest/index.html'])
        .pipe(gulp.dest(paths.dist));
});

gulp.task('widgetizer', ['clean', 'test', 'copy', 'jshint'], function() {
    return browserify('./src/js/WidgetizerGlobalAndAMD.js')
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(vinylSource('widgetizer_standalone.min.js'))
        .pipe(vinylBuffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('jshint', function() {
     return gulp.src(['./src/js/**/**.js'])
         .pipe(jshint())
         .pipe(jshint.reporter('jshint-stylish'))
         .pipe(jshint.reporter('fail'))
});

gulp.task('start_mock_server', function() {
    mockServer = server.listen(3000, function () {
        var host = mockServer.address().address;
        var port = mockServer.address().port;

        console.log('[MOCK SERVER] Listening at http://%s:%s', host, port);
    });
});

gulp.task('stop_mock_server', function() {
    mockServer.close();
});

// PRIVATE TASK, RUN 'test' instead
gulp.task('_unittest', ['start_mock_server', 'jshint'], function() {
    return new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        files: ['src/js/**/*.js', 'src/spec/Widgetizer/*.js', 'src/spec/Widgetizer/Unit/**/*.js', 'src/spec/Widgetizer/Mock/**/*.js']
    }, function() {
        console.log('[MOCK SERVER] No longer listening.');
        mockServer.close();
    }).start();
});

// PRIVATE TASK, RUN 'test' instead
gulp.task('_componenttest', ['_unittest'], function() {
    return new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        files: ['src/js/**/*.js', 'src/spec/Widgetizer/*.js', 'src/spec/Widgetizer/Component/**/*.js', 'src/spec/Widgetizer/Mock/**/*.js']
    }, function() {
        console.log('[MOCK SERVER] No longer listening.');
        mockServer.close();
    }).start();
});

gulp.task('test', ['_unittest', '_componenttest']);
gulp.task('default', ['widgetizer']);
