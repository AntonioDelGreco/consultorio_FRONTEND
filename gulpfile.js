const { src, dest, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const avif = require('gulp-avif')

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('./src/assets/estetica2.jpeg')
        .pipe( cache( imagemin(opciones) ) ) //descargar gulp-cache
        .pipe( dest('./src/assets/imgOptimizadas') )
    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('./src/assets/estetica2.jpeg')
        .pipe( webp(opciones) )
        .pipe( dest('./src/assets/imgOptimizadas') )
    done();
}

function versionAvif(done){
    const opciones = {
      quality: 50
  };
  src('./src/assets/estetica2.jpeg')
      .pipe( avif(opciones) )
      .pipe( dest('./src/assets/imgOptimizadas') )
  done();
}

exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.versionWebp = versionWebp;
exports.dev = parallel( imagenes, versionAvif, versionWebp ); 