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
        paths.src + '/js/Widgetizer/config.js',
        paths.src + '/js/Widgetizer/ConfigCheck.js',
        paths.src + '/js/Widgetizer/JSON2Markup.js',
        paths.src + '/js/Widgetizer/RequestUrlBuilder.js',
        paths.src + '/js/Widgetizer/TemplateProvider.js',
        paths.src + '/js/Widgetizer/Widget.js',
        paths.src + '/js/Widgetizer/WidgetRenderer.js',
        paths.src + '/js/Widgetizer/WidgetSelect.js',
        paths.src + '/js/Widgetizer/XhrRequest.js',
        paths.src + '/js/Widgetizer.js'
    ];

gulp.task('clean', function(cb) {
    del(paths.dist + '/**/*', cb);
});

gulp.task('js', ['jasmine', 'clean'], function() {
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

// PHANTOMJS NEEDS TO BE IN THE $PATH, in the directory where this gulpfile is do:
// PATH=$PATH:$(pwd)/node_modules/.bin && export PATH
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
