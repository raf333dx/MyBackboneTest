(function () {
  'use strict';

  var path = require('path'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('./conf');

  gulp.task('inject', ['copy-template', 'copy-css', 'copy-libs', 'copy-js'], function () {
    var injectScripts = gulp.src([
        conf.paths.temp.libs + '/**/require.js'
      ]),
      injectStyles = gulp.src([
        conf.paths.temp.libs + '/**/*.min.css',
        conf.paths.temp.less + '/**/main.css'
      ]);

    return gulp.src(conf.paths.src + '/*.html')
      .pipe($.inject(injectStyles, {ignorePath: conf.paths.temp.root}))
      .pipe($.inject(injectScripts, {ignorePath: conf.paths.temp.root}))
      .pipe(gulp.dest(conf.paths.temp.root));
  });

  gulp.task('copy-template', ['styles'], function () {
    return gulp.src(conf.paths.src + '/templates/**/*.html')
      .pipe(gulp.dest(conf.paths.temp.templates));
  });

  gulp.task('copy-css', ['styles'], function () {
    return gulp.src(conf.paths.src + '/less/**/*.css')
      .pipe(gulp.dest(conf.paths.temp.less));
  });

  gulp.task('copy-libs', function () {
    return gulp.src([conf.paths.src + '/libs/**/*.min.css',
      conf.paths.src + '/libs/**/*.js'])
      .pipe(gulp.dest(conf.paths.temp.libs));
  });

  gulp.task('copy-js', ['scripts'], function () {
    return gulp.src(conf.paths.src + '/js/**/*.js')
      .pipe(gulp.dest(conf.paths.temp.js));
  });
}());
