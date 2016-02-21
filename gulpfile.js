// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var smushit = require('gulp-smushit');
var vinylfs = require('vinyl-fs');


// Directory structure
var dir = {
  root: {
    dist: './dist/',
    live: './live/'
  },
  js: {
    dist: './dist/js',
    live: './live/js'
  },
  css: {
    dist: './dist/css',
    live: './live/css'
  },
  img: {
    dist: './dist/css/images',
    live: './live/css/images'
  }
}


/* SCRIPTS ------------------------ */
// JSHint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(dir.js.dist))
    .pipe(gulp.dest(dir.js.live));
});


/* CSS ------------------------ */
// add prefixes and minify css
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('style.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(dir.css.dist))
    .pipe(gulp.dest(dir.css.live));
});


/* ASSETS --------------------- */
// minify new images
gulp.task('imagemin', function() {
  gulp.src('./src/css/images/*.{jpg,png}')
    .pipe(changed(dir.img.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(dir.img.dist))
    .pipe(gulp.dest(dir.img.live));
});


/* HTML ------------------------ */
// minify html
gulp.task('minifyHTML', function() {
	gulp.src('./src/*.html')
		.pipe(changed(dir.root.dist))
		.pipe(minifyHTML())
		.pipe(gulp.dest(dir.root.dist))
    .pipe(gulp.dest(dir.root.live));
})

// Build out all files that haven't yet been built
gulp.task('build', function() {
  var src = ['./src/*', './src/**/*'],
      dest = makeDest();

  gulp.src(['./src/*', './src/**/*'])
    .pipe(changed(dir.root.dist))
    .pipe(gulp.dest(dir.root.dist))
    .pipe(gulp.dest(dir.root.live));
});

// default task
gulp.task('default', ['minifyHTML', 'scripts', 'styles', 'imagemin']);

// watch task
gulp.task('watch', function() {

  // HTML
  gulp.watch('./src/*.html', function() {
    gulp.run('minifyHTML');
  });

  // CSS
  gulp.watch('./src/css/*.css', function() {
    gulp.run('styles');
  });

  // JS
  gulp.watch('./src/js/*.js', function() {
    gulp.run('scripts');
    gulp.run('jshint');
  });

  // Build
  gulp.watch(['./src/*', './src/**/*'], function() {
    gulp.run('build');
  });
});
