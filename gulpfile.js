'use strict';

var $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    lazypipe = require('lazypipe'),
    bower = require('gulp-bower'),
    notify = require("gulp-notify");

var scss_dir = './assets/scss/';
var css_dir = './assets/css/';
var scripts_dir = './assets/js/';

// SCSS COMPILE
gulp.task('styles', function () {
    gulp.src(scss_dir + 'main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(css_dir))
        .pipe(notify({
            title: "SCSS compiled successfully",
            message: "Jupi!",
            onLast: true
        }));
});

// COPY SCRIPTS
gulp.task('copy', function () {
    return gulp.src(['bower_components/jquery-masonry/masonry.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(scripts_dir));
});

// SCSS WATCHER
gulp.task('watch', function () {
    gulp.watch(scss_dir + '/**/*.scss', ['sass']);
});

// CLEAN DIST DIRECTORIES
gulp.task('clean', require('del').bind(null, [css_dir, scripts_dir]));

// BOWER INSTALL
gulp.task('bower-install', function () {
    return $.bower().on('end', function () {
        console.log('Bower components installed');
    });
});

gulp.task('build', ['styles']);

gulp.task('setup', ['clean', 'bower-install'], function () {
    gulp.start('copy');
    gulp.start('build');
});

gulp.task('default', function() {
    // place code for your default task here
});