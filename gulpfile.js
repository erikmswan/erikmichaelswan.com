// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cache = require('gulp-cached');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var gzip = require('gulp-gzip');
var smushit = require('gulp-smushit');
var vinylfs = require('vinyl-fs');
var tasks = require('gulp-task-listing');
var error = require('gulp-util');


// Directory structure
var dir = {
  root: {
    dist: './dist/',
    live: '../es/'
  },
  js: {
    dist: './dist/js',
    live: '../es/js'
  },
  css: {
    dist: './dist/css',
    live: '../es/css'
  },
  img: {
    dist: './dist/images',
    live: '../es/images'
  }
}


/* SCRIPTS ------------------------ */
// JSHint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src('./src/js/*.js')
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(dir.js.dist))
    .pipe(gulp.dest(dir.js.live));
});


/* Less ------------------------ */
gulp.task('less', function () {
  gulp.src(['./src/css/*.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(autoprefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest(dir.css.dist))
    .pipe(gulp.dest(dir.css.live));
});


/* MARKUP & ASSETS --------------------- */
// minify html
gulp.task('minifyHTML', function() {
	gulp.src('./src/*.html')
		.pipe(changed(dir.root.dist))
    .pipe(changed(dir.root.live))
		.pipe(minifyHTML())
		.pipe(gulp.dest(dir.root.dist))
    .pipe(gulp.dest(dir.root.live));
});

// minify new images
gulp.task('imagemin', function() {
  gulp.src('./src/css/images/*.{jpg,png}')
    .pipe(changed(dir.img.dist))
    .pipe(changed(dir.img.live))
    .pipe(imagemin())
    .pipe(gulp.dest(dir.img.dist))
    .pipe(gulp.dest(dir.img.live));
});


/* BUILD & Utility ------------------------ */
// Build out all files that haven't yet been built
gulp.task('build', function() {
  gulp.src(['./src/*', './src/**/*', '!./src/**/*.less'])
    .pipe(changed(dir.root.dist))
    .pipe(changed(dir.root.live))
    .pipe(gulp.dest(dir.root.dist))
    .pipe(gulp.dest(dir.root.live));
});

// List all tasks
gulp.task('tasks', tasks);


/* DEFAULT --------------------*/
gulp.task('default', ['minifyHTML', 'scripts', 'less', 'imagemin', 'build']);


/* WATCH --------------------*/
gulp.task('watch', function() {

  // build all
  gulp.watch(['./src/*', './src/**/*', '!./src/**/*.less'], ['build'])

  // watch for JS changes
  gulp.watch('./src/js/**/*.js', ['jshint', 'scripts']);

  // watch for CSS changes
  gulp.watch('./src/css/*.less', ['less']);

  // watch for HTML changes
  gulp.watch('./src/*.html', ['minifyHTML']);

  // watch for images
  gulp.watch(['./src/img/*.png', './src/img/*.jpg'], ['imagemin']);
});
