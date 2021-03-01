const gulp = require('gulp');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
//const pug = require('gulp-pug');
const sass = require('gulp-sass');
//const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');




/* -------- Server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */
/* gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
}); */

/* ------------ html ------------- */
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
});
/* ------------ css ------------- */
gulp.task('bscopy', function () {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('build/css'))
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'));
});

/*----------------js---------------------------*/
gulp.task('js', function() {
  return gulp.src([
   /*  'src/js/init.js',
    'src/js/validation.js',
    'src/js/form.js',
    'src/js/navigation.js', */
    'src/js/main.js'
  ])
    .pipe(babel({
      presets: ['@babel/preset-react','@babel/env'],
     // plugins: ['@babel/plugin-syntax-jsx']
    }))
    .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

/* ------------ Sprite ------------- */
/* gulp.task('sprite', function(cb) {
  const spriteData = gulp.src('src/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('build/img/'));
  spriteData.css.pipe(gulp.dest('source/styles/global/'));
  cb();
}); */

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./src/img/**/*.*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'));
});
/* ------------ Copy slick ------------- */
gulp.task('copy:slick', function() {
  return gulp.src('./src/slick/**/*.*')
    .pipe(gulp.dest('build/slick'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:slick'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('src/**/*.html', gulp.series('templates:compile'));
  gulp.watch('src/scss/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/slick/**/*.*', gulp.series('copy:slick'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile','bscopy', 'js', 'copy'),
  gulp.parallel('watch', 'server')
  )
);
