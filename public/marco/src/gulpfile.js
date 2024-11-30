var gulp = require("gulp"),
    babelify = require('babelify'),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify");

gulp.task("build", function(){
    return browserify({
        entries: ["./app.js"]
    })
    .transform(babelify.configure({
        presets : ["@babel/preset-env"],
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("../"));
});
