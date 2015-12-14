var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    filesize = require('gulp-filesize'),
    connect = require('gulp-connect'),
    uglifyjs = require('gulp-uglify'),
    less = require('gulp-less'),
    path = require('path');


var js = ['bower_components/angular/angular.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            './web-client-sources/js/**/*.js'];

var css = ['bower_components/bootstrap/dist/css/bootstrap.min.css'];

var lessApp = './web-client-sources/styles/app.less';


gulp.task('build-js', function () {
    return gulp.src(js)
        // .pipe(uglifyjs())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./builds'))
        .pipe(filesize())
        .pipe(connect.reload());
});

gulp.task('build-less', function () {
    return gulp.src(lessApp)
        .pipe(less())
        .pipe(minifycss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./builds'))
        .pipe(connect.reload());
});

gulp.task('build-css', function () {
    return gulp.src(css)
        .pipe(minifycss({keepBreaks: false}))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./builds'))
        .pipe(filesize())
        .pipe(connect.reload());
});

gulp.task('copy-html', function(){
    return gulp.src('./web-client-sources/**/*.html')
        .pipe(gulp.dest('./builds'))
        .pipe(connect.reload());

});

gulp.task('copy-picture', function () {
    return gulp.src(['./web-client-sources/**/*.jpg', './web-client-sources/**/*.png'])
        .pipe(gulp.dest('./builds'));
});

gulp.task('watch', function () {
    gulp.watch('web-client-sources/js/**/*.js', ['build-js'])
        .on('change', function(){ console.log('JS files has been changed'); });
    gulp.watch('web-client-sources/styles/*.less', ['build-less'])
        .on('change', function(){ console.log('Less files has been changed'); });
    gulp.watch('web-client-sources/**/*.html', ['copy-html'])
        .on('change', function(){ console.log('html files has been changed'); });
});

gulp.task('connect', function () {
  connect.server({
    root: './builds',
    livereload: true
  });
});

gulp.task('default', ['build-js', 'build-less', 'build-css', 'copy-html', 'watch', 'connect']);
