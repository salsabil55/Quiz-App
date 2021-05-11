var gulp = require("gulp");
var concat = require("gulp-concat");
var prefix = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var watch = require("gulp-watch");
var livereload = require("gulp-livereload");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
// var notify = require("gulp-notify");
// var zip = require("gulp-zip");

//gulp-vinyl-ftp to upload website

// html task
gulp.task("html", function () {
  return (
    gulp
      .src("stage/html/*.pug")
      // minify html
      // .pipe(pug())
      .pipe(pug({ pretty: true }))
      .pipe(gulp.dest("dist"))
      .pipe(livereload())
  );
});

// css task
gulp.task("css", function () {
  return (
    gulp
      .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
      .pipe(sourcemaps.init())
      // minify css
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(prefix("last 2 versions"))
      .pipe(concat("main.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
      .pipe(livereload())
  );
});

//js task
gulp.task("js", function () {
  return gulp
    .src("stage/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

//compress task

// gulp.task("compress", function () {
//   return gulp
//     .src("dist/**/*.*")
//     .pipe(zip("file.zip"))
//     .pipe(gulp.dest("."))
//     .pipe(notify("Files Is compressed"));
// });

//watch task
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("stage/html/**/*.pug", gulp.series("html"));
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], gulp.series("css"));
  gulp.watch("stage/js/*.js", gulp.series("js"));
});
