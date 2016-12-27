var gulp = require('gulp');

/*
 *
 *
 *
 *
 * @styles(js)
 *
 */
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
	return gulp.src('./client/.styles/main.scss', { cwd: '..' })
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass.sync({
			outputStyle : 'expanded',
			precision   : 10,
			includePaths: ['.']
		}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./client/_styles/', { cwd: '..' }));
});

/*
 *
 *
 *
 *
 * @svg(js)
 *
 * article: https://css-tricks.com/icon-fonts-vs-svg/
 * article: https://css-tricks.com/svg-symbol-good-choice-icons/
 *
 */
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var footer = require('gulp-footer');
var header = require('gulp-header');
var rename = require('gulp-rename');

gulp.task('svg', function () {
	return gulp.src('./client/.svg/**/*.svg', { cwd: '..' })
		.pipe(svgmin(function getOptions(file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + '-',
						minify: true
					}
				}]
			}
		}))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(header('<template name="svgSymbols">'))
		.pipe(footer('</template>'))
		.pipe(rename('svgSymbols.html'))
		.pipe(gulp.dest('./client/_svg/', { cwd: '..' }));
	
	
});

/*
 *
 *
 *
 *
 * @watch(js)
 *
 */
gulp.task('watch', ['styles', 'svg'], function () {
	gulp.watch('./client/.styles/**/*.scss', { cwd: '..' }, ['styles']);
	gulp.watch('./client/.svg/**/*.svg', { cwd: '..' }, ['svg']);
});