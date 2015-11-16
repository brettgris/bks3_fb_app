// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass =  require('gulp-compass'),
    data = require('gulp-data'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade'),
    fs = require('fs'),
    fileinclude = require('gulp-file-include');

var getJsonData = function(file){
   return JSON.parse(fs.readFileSync('./Development/jade/data/data.json', 'utf8'));
};

gulp.task('jade', function() {
    return gulp.src(['Development/jade/**/*.jade'])
        .pipe(data(getJsonData))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("Development/includes/"));
});

gulp.task('html', ['jade'], function() {
    gulp.src('Development/includes/*.html')
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest('Production/'))
});

// Compile Our Sass with Compass
gulp.task('sass', function() {
    return gulp.src('Development/scss/compile/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(compass({
            'sass': 'Development/scss/compile',
            'css': 'Production/css',
            'images': 'Production/images',
            'style': 'compressed'
        }))
        .on('error', function(err) {})
        .pipe(gulp.dest('Production/css'));
});

// JS - concat and min
gulp.task('js', function() {
    return gulp.src('Development/scripts/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('Production/js'));
});

//COFFE SCRIPT
gulp.task('coffee', function() {
  gulp.src('Development/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('Development/scripts/'))
});

// JS PLUGINS - concat and min
gulp.task('plugins', function() {
    return gulp.src('Development/requirements/*.js')
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('Production/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('Development/coffee/**/*', ['coffee']);
    gulp.watch('Development/scripts/**/*', ['js']);
    gulp.watch('Development/requirements/**/*', ['plugins']);
    gulp.watch('Development/scss/**/*', ['sass']);
    gulp.watch('Development/jade/**/*', ['html']);
    gulp.watch(['Production/**/*']).on('change', browserSync.reload);
});

// BROWSER SYNC
gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "Production/"
        }
    });
});

// Default Task
gulp.task('default', ['html','sass','coffee','js','plugins','watch','sync']);