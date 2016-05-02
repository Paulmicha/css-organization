
/**
 *  Gulp CSS compilation
 *
 *  Installation :
 *  $ npm install
 *
 *  Usage :
 *  $ gulp
 *
 *  @see http://cssnext.io/postcss/
 *  @see package.json
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('stylesheets', function()
{
    gulp.src('index.css')
        //.pipe(sourcemaps.init())
        .pipe(postcss([
            require("postcss-import")(),
            require("postcss-cssnext")(),
            require("postcss-extend")(),
            require("cssnano")()
        ]))
        .pipe(concat('main.css'))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
});

// 'Watch' as default task.
gulp.task('default', function() {
    gulp.watch(['**/*.css', '!main.css'], ['stylesheets']);
});
