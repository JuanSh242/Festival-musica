const {src,dest, watch, parallel} = require('gulp');
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
//imagenes
const cache = require('gulp-cache');
const webp = require('gulp-webp');
//const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
//src buscar // dest guardarlo

function css(cb){
 src('src/scss/**/*.scss')
 .pipe(plumber())
 .pipe(sass())
 .pipe(dest('build/css'))
 cb();
}

function imagenes(cb){
    const obtions = {
        obtimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
       .pipe( cache(imagemin(obtions)))
       .pipe(dest('build/img'))
    cb();
}

function versionwebp(cb){
    const obtions = {
        quality: 50
    };

    src('src/img/**//*.{png,jpg}')
       .pipe( webp(obtions))
       .pipe( dest('build/img'))
    cb();
}

function versioabif(cb){
    const obtions = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
       .pipe( avif(obtions))
       .pipe( dest('build/img'))
   cb();
}


function javascrip(cb){
  src('src/js/**/*.js')
   .pipe(dest('build/js'))
  cb();
}

function dev(cb){
    watch('src/scss/**/*.scss',css)
    watch('src/js/**/*.js',javascrip)
    return cb();
}

exports.css = css;
exports.javascrip = javascrip;
//exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versioabif = versioabif;
exports.dev =  parallel(css,javascrip,versionwebp,versioabif,dev);