var gulp   = require('gulp');
var del    = require('del');
var jshint = require('gulp-jshint');
var jsdoc  = require('gulp-jsdoc');
var amd    = require('amd-optimize');
var concat = require('gulp-concat');
var eventStream = require('event-stream');
var order  = require('gulp-order');
var uglify = require('gulp-uglify');


var paths = {};
    paths.dist    = './dist';
    paths.src     = './src';
    paths.scripts = paths.src + '/js/**/*.js';
    paths.doc     = paths.dist + '/doc';
    paths.test    = paths.src + '/spec';


gulp.task('clean', function(cb) {
    del(paths.dist + '/**/*', cb);
});

gulp.task('js', ['clean'], function() {
    eventStream.merge(
        gulp.src('./node_modules/almond/almond.js')
            .pipe(uglify()),
        gulp.src(paths.scripts)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
            .pipe(jsdoc(paths.doc))
            .pipe(amd('app', {'baseUrl': paths.src + '/js'}))
            .pipe(concat('widgetizer.js'))
    )
    .pipe(order(['almond.js', 'widgetizer.js']))
    .pipe(concat('widgetizer_standalone.js'))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('build', ['js']);
