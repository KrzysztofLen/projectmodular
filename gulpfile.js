/**
 * Created by Hp on 2017-02-12.
 */

'use strict';

var gulp = require('gulp'),
$ = require('gulp-load-plugins')({
    lazy: true
}),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    cssnano = require('gulp-cssnano');


gulp.task('sass', function() {

    //$.log($.colors.yellow('Compiling SASS to CSS...'));

    gulp.src("sass/style.scss")
        //.pipe($.plumber())
        .pipe($.sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe($.autoprefixer({
            browsers: ["last 5 version", "IE 9"]
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});


gulp.task("watch", function() {

    gulp.watch("sass/**/*.scss", ["sass"]);
});


// Static server
gulp.task('browser-sync', function() {

    browserSync.init({
        proxy: "http://localhost/projectmodular/views/"
    });

    gulp.watch("*.html").on("change", reload);
});

// All tasks
/**
 * Created by Hp on 2017-02-12.
 */

'use strict';

var gulp = require('gulp'),
$ = require('gulp-load-plugins')({
    lazy: true
}),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


gulp.task('sass', function() {

    //$.log($.colors.yellow('Compiling SASS to CSS...'));

    gulp.src("sass/style.scss")
        //.pipe($.plumber())
        .pipe($.sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe($.autoprefixer({
            browsers: ["last 5 version", "IE 9"]
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});


gulp.task("watch", function() {

    gulp.watch("sass/**/*.scss", ["sass"]);
});


gulp.task('cssnano', function () {
    return gulp.src('./css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./style/'));
});


// Static server
gulp.task('browser-sync', function() {

    browserSync.init({
        proxy: "http://localhost/projectmodular/views"
    });

    gulp.watch("*.html").on("change", reload);
});

// All tasks
gulp.task('default', ["sass", "cssnano", 'browser-sync', 'watch']);