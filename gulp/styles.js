(function () {
  'use strict';

  var path = require('path');
  var gulp = require('gulp');
  var conf = require('./conf');
  var less = require('gulp-less');

  // var $ = require('gulp-load-plugins')();
  var del = require('del');

  gulp.task('styles', ['clean-styles'], function () {
    return gulp.src(conf.paths.src + '/less/main.less')
      .pipe(less({
        paths: [ path.join(conf.paths.src, '/less/**/*.less') ]
      }))
      .pipe(gulp.dest(path.join(conf.paths.src, 'less')));
  });

  gulp.task('wstyles', ['styles'], function () {
    gulp.watch(path.join(conf.paths.src, '/less/**/*.less'), function () {
      gulp.start('styles');
    });
  });

  gulp.task('clean-styles', function () {
    return del([path.join(conf.paths.src, 'less/**/*.css')]);
  });
}());
