const del = require("del");
const clean = require("gulp-clean");
const path = require("path");
const gulp = require("gulp");
const runSequence = require("run-sequence");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const gulpSass = require("gulp-sass");
const htmlmin = require("gulp-htmlmin");
const postCss = require("gulp-postcss");
const cleanCss = require("gulp-clean-css");
const rev = require("gulp-rev");
const revReplace = require("gulp-rev-replace");
const filter = require("gulp-filter");
const fileInclude = require("gulp-file-include");

const PUBLIC_PATH = path.resolve(__dirname, "dist/assets");

gulp.task("clean", () => {
  return del(["dist"]);
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
  return (
    gulp
      .src("./src/*.html")
      .pipe(
        fileInclude({
          prefix: "@@",
          indent: true,
          basepath: "./src/templates/"
        })
      )
      .pipe(
        htmlmin({
          collapseWhitespace: true
        })
      )
      // .pipe(gulp.dest("test"));
      .pipe(gulp.dest(path.resolve(PUBLIC_PATH, "../")))
  );
});

gulp.task("sass", () => {
  return gulp
    .src("src/scss/*.scss")
    .pipe(
      gulpSass({
        bundleExec: true
      })
    )
    .pipe(postCss())
    .pipe(cleanCss())
    .pipe(gulp.dest(path.join(PUBLIC_PATH, "css")));
});

// 将 dist/assets文件夹中添加hash后缀，并且copy到dist
gulp.task("rev", () => {
  return gulp
    .src(path.join(PUBLIC_PATH, "**/*"))
    .pipe(rev())
    .pipe(gulp.dest(PUBLIC_PATH))
    .pipe(rev.manifest())
    .pipe(gulp.dest("dist/rev"));
});

// 删除原版文件(无hash后缀)
gulp.task("pure", () => {
  const f = filter(
    file => {
      return /^[^-]+\./.test(file.path.split("/").slice(-1)[0]);
    },
    { restore: true }
  );

  return gulp
    .src(path.join(PUBLIC_PATH, "**/*"))
    .pipe(f)
    .pipe(clean());
});

gulp.task("urlReplaceHtml", () => {
  return gulp
    .src(path.resolve(PUBLIC_PATH, "../", "*.html"))
    .pipe(
      revReplace({
        manifest: gulp.src("dist/rev/*.json"),
        modifyReved: function(name) {
          console.log("html ---- name: " + name);
          return "assets/" + name;
        }
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("urlReplaceCss", () => {
  return gulp
    .src(path.resolve(PUBLIC_PATH, "css/*.css"))
    .pipe(
      revReplace({
        manifest: gulp.src("dist/rev/*.json")
      })
    )
    .pipe(gulp.dest(path.resolve(PUBLIC_PATH, "css")));
});

gulp.task("image", () => {
  return gulp
    .src("./src/imgs/*")
    .pipe(gulp.dest(path.join(PUBLIC_PATH, "imgs")));
});

gulp.task("build", () => {
  runSequence(
    "clean",
    ["js", "html", "sass", "image"],
    "rev",
    ["urlReplaceHtml", "urlReplaceCss"],
    "pure"
  );
});

gulp.task("dev", () => {
  console.log("service is listenning at port 8088");
});
