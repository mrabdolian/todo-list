// Include gulp
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// Define paths
var src = '';
var lib_src = 'bower_components/';
var lib_dest = 'lib/';
var js_path = 'js/**/*';
var html_path = '*.html';
var css_path = 'css/*.css';
var views_path = 'views/*.html';

// Tasks for library files: /////////////////////
// JS files
gulp.task('libJs', function () {
    return gulp.src(src + lib_src + '/**/*.min.js')
        .pipe(gulp.dest(lib_dest));
});
// CSS files
gulp.task('libCss', function () {
    return gulp.src(src + lib_src + '/**/*.min.css')
        .pipe(gulp.dest(lib_dest));
});
// Font files (for font-awesome, ...)
gulp.task('libFont', function () {
    return gulp.src([src + lib_src + '/**/*.eot',
        src + lib_src + '/**/*.svg',
        src + lib_src + '/**/*.ttf',
        src + lib_src + '/**/*.woff',
        src + lib_src + '/**/*.woff2',
        src + lib_src + '/**/*.otf'])
        .pipe(gulp.dest(lib_dest));
});
/////////////////////////////////////////////////

// Tasks for live reload: ///////////////////////
gulp.task('js', function () {
    gulp.src(src + js_path)
});
gulp.task('html', function () {
    gulp.src(src + html_path)
});
gulp.task('css', function () {
    gulp.src(src + css_path)
});
/////////////////////////////////////////////////

// Watch for changes in files
gulp.task('watch', function () {
    // Watch bower components (libraries)
    gulp.watch(src + 'bower_components', ['libJs', 'libCss', 'libFont']);

    // Watch html, css and js files for live reload
    gulp.watch(src + js_path, ['js']);
    gulp.watch(src + css_path, ['css']);
    gulp.watch([src + html_path, src + views_path], ['html']);
});

// Webserver
gulp.task('webserver', function () {
    gulp.src(src)
        .pipe(plugins.webserver({
            livereload: true,
            open: true
        }));
});

// Default tasks
gulp.task('default', ['watch', 'libJs', 'libCss', 'libFont', 'html', 'js', 'css', 'webserver']);
