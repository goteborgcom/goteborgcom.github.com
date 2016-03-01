var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*
  Common paths
*/
var paths = {
  styles : 'assets/styles/**/*.scss',
  scripts : 'assets/scripts/**/*.js',
  build : {
    styles : 'assets/min/',
    scripts : 'assets/min/'
  }
};

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
  browserSync({
    server : { baseDir : './' }
  })
});

/*
  Styles
*/
gulp.task('styles', function() {
  gulp.src(paths.styles)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build.styles))
    .pipe(reload({stream : true}));
});

/*
  Scripts
*/
gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('main.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build.scripts))
    .pipe(reload({stream : true}));
});

gulp.task('default', ['styles','scripts', 'browser-sync'], function() {
  gulp.watch(
    [paths.styles, paths.scripts],
    ['styles','scripts']
  )
});
