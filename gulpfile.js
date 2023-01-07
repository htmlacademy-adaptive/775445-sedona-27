import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}

// Images Bitmap root (jpg, png)

const optimizeBitmapRoot = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(squoosh({}))
    .pipe(gulp.dest('build/img'))
}

// Images Vector root (svg)

const optimizeVectorRoot = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img'))
}

// Images Bitmap gallery (jpg, png)

const optimizeBitmapGallery = () => {
  return gulp.src('source/img/gallery/*.{jpg,png}')
    .pipe(squoosh({}))
    .pipe(gulp.dest('build/img/gallery'))
}

// Favicons Bitmap (png)

const optimizeBitmapFavicons = () => {
  return gulp.src('source/img/favicons/*.png')
    .pipe(squoosh({}))
    .pipe(gulp.dest('build/img/favicons'))
}

// Favicons Vector (svg)

const optimizeVectorFavicons = () => {
  return gulp.src('source/img/favicons/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/favicons'))
}

// Copy Bitmap images root

const copyImagesRoot = () => {
  return gulp.src('source/img/*.{png,jpg,svg}')
    .pipe(gulp.dest('build/img'))
}

// Copy Bitmap images gallery

const copyImagesGallery = () => {
  return gulp.src('source/img/gallery/*.{png,jpg,svg}')
    .pipe(gulp.dest('build/img/gallery'))
}

// WebP root

const createWebpRoot = () => {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// WebP gallery

const createWebpGallery = () => {
  return gulp.src('source/img/gallery/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img/gallery'))
}

// Create Sprite

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return del('build');
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

export const build = gulp.series(
  clean,
  copy,
  optimizeBitmapRoot,
  optimizeVectorRoot,
  optimizeBitmapGallery,
  optimizeBitmapFavicons,
  optimizeVectorFavicons,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebpRoot,
    createWebpGallery
  )
);

export default gulp.series(
  clean,
  copy,
  copyImagesRoot,
  copyImagesGallery,
  optimizeBitmapFavicons,
  optimizeVectorFavicons,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebpRoot,
    createWebpGallery
  ),
  gulp.series(
    server,
    watcher
  )
);
