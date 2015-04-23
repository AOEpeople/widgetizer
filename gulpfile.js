var gulp    = require('gulp');
var del     = require('del');
var jshint  = require('gulp-jshint');
var jsdoc   = require('gulp-jsdoc');
var concat  = require('gulp-concat');
var jasmine = require('gulp-jasmine-browser');
var addsrc  = require('gulp-add-src');
var uglify  = require('gulp-uglify');

var paths = {};
    paths.dist    = './dist';
    paths.src     = './src';
    paths.doc     = paths.dist + '/doc';
    paths.test    = paths.src + '/spec';
    paths.libs    = './bower_components';
    paths.orderedLibsList = [
        paths.libs + '/qwest/qwest.min.js',
        paths.libs + '/markup.js/src/markup.min.js'
    ];
    paths.orderedScriptList = [
        // Widgetizer.js has the namespace, so it should come first
        paths.src + '/js/Widgetizer.js',
        paths.src + '/js/**/*.js'
    ];

gulp.task('clean', function(cb) {
    del(paths.dist + '/**/*', cb);
});

gulp.task('copy', function() {
    gulp.src([paths.src + '/manualtest/index.html', paths.test + '/mock/19'])
        .pipe(gulp.dest(paths.dist));
});

gulp.task('js', ['clean', 'jasmine', 'copy'], function() {
    gulp.src(paths.orderedScriptList)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(addsrc.prepend(paths.orderedLibsList))
        .pipe(concat('widgetizer_standalone.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist))
        .pipe(jsdoc(paths.doc))
});

gulp.task('jasmine', function() {
     return gulp.src(['src/js/**/*', 'src/spec/**/*'])
         .pipe(jshint())
         .pipe(jshint.reporter('jshint-stylish'))
         .pipe(jshint.reporter('fail'))
         .pipe(addsrc.prepend(paths.orderedLibsList))
         .pipe(jasmine.specRunner({console: true}))
         .pipe(jasmine.phantomjs());
});

gulp.task('build', ['js']);
