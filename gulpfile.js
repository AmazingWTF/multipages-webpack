const gulp = require("gulp");
const pump = require("pump");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

gulp.task("default", () => {
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
    .pipe(gulp.dest("dist"));
});
