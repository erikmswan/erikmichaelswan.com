// include gulp
var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var sass = require('gulp-ruby-sass');
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

// JSHint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JSHint watch task
gulp.task('jsWatch', function() {
  // watch for JS changes
  gulp.watch('./src/js/*.js', function() {
    gulp.run('jshint');
  });
});

// Sass task
gulp.task('sass', function () {
  gulp.src('./src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css/'));
});

// add prefixes and minify css
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('style.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/css/images/*.{jpg,png}',
      imgDst = './build/css/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// gzip css and js
// BROKEN
// gulp.task('gzip', function() {
// 	var srcOne = './src/css/*.css',
// 		dstOne = './build/css/',
// 		srcTwo = './src/js/*.js',
// 		dstTwo = './build/js/';


// 	gulp.src(srcOne)
// 		.pipe(gzip({ append:false }))
// 		.pipe(gulp.dest(dstOne));
// 	gulp.src(srcTwo)
// 		.pipe(gzip({ append:false }))
// 		.pipe(gulp.dest(dstTwo));
// });

// minify html
gulp.task('minifyHTML', function() {
	var htmlSrc = './src/*.html',
			htmlDst = './build';

	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));
})

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// Build out all files that haven't yet been built
gulp.task('buildAll', function() {
  var src = ['./src/*', './src/**/*'],
      dst = './build/';

  gulp.src(src)
    .pipe(changed(dst))
    .pipe(gulp.dest(dst));
});

// default task
gulp.task('default', ['imagemin', 'minifyHTML', 'scripts', 'styles']);

// watch task
gulp.task('watch', function() {
  // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('minifyHTML');
  });

  // watch for JS changes
  gulp.watch('./src/js/*.js', function() {
    gulp.run('scripts');
  });

  // watch for CSS changes
  gulp.watch('./src/css/*.css', function() {
    gulp.run('styles');
  });
});

