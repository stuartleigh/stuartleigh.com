var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var stylePath = 'css/src/'
var styles = stylePath + '**/*.scss'

gulp.task('sass', function() {
  return gulp.src(styles)
    .pipe(sass({
      onError: function(error) {
        gutil.log(
          gutil.colors.red('[sass] ' + error.message + ' on line ' + error.line + ' in ' + error.file)
        );
      }
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css/build'));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(styles, ['sass'])
  // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
  .on('change', function(evt) {
    var file = evt.path.replace(path.join(__dirname, stylePath), '');
    gutil.log(
      gutil.colors.green('[sass] File ' + file + ' was ' + evt.type + ', compiling...')
    );
  });
});