const { watch, src, dest, parallel } = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const cssnano = require("cssnano")
const postcss = require("gulp-postcss")

function css() {
  return src("src/sass/**/*.scss")
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest("./styles"))
}

function watchall() {
  watch("src/sass/**/*.scss", css)
}

exports.default = parallel(css, watchall)
