const del = require("del");
const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const runSequence = require("run-sequence");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const gulpSass = require("gulp-sass");
const htmlmin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rev = require("gulp-rev");
const rename = require("gulp-rename");
const copy = require("gulp-copy");

const PUBLIC_PATH = path.resolve(__dirname, ".tmp/assets");

gulp.task("clean", () => {
  return del([".tmp"]);
});

gulp.task("js", () => {
  // return pump([gulp.src("./src/js/*.js"), uglify(), gulp.dest("dist")], () =>
  //   console.log("js compile successful!")
  // );
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(path.join(PUBLIC_PATH, "js")));
});

gulp.task("html", () => {
  return gulp
    .src("./src/views/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(path.resolve(PUBLIC_PATH, "../")));
});

gulp.task("sass", () => {
  const plugins = [autoprefixer({ browsers: ["last 1 version"] })];
  return gulp
    .src("src/scss/*.scss")
    .pipe(
      gulpSass({
        bundleExec: true
      })
    )
    .pipe(
      cleanCss({
        plugins
      })
    )
    .pipe(gulp.dest(path.join(PUBLIC_PATH, "css")));
});

// 将 .tmp/assets文件夹中添加hash后缀，并且copy到dist
gulp.task("rev", () => {
  return gulp
    .src(path.join(PUBLIC_PATH, "**/*"))
    .pipe(rev())
    .pipe(gulp.dest("dist"))
    .pipe(rev.manifest())
    .pipe(gulp.dest(".tmp/rev"));
});

gulp.task("urlReplace", () => {});

gulp.task("default", () => {
  runSequence("clean", ["js", "html", "sass"], "rev", "urlReplace");
});
