const gulp = require('gulp');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cssnext = require("postcss-cssnext");
const normalize = require("postcss-normalize");

gulp.task('css', function () {
    const plugins = [
        cssnext({ 
            browsers: [
                "> 1%",
                "last 1 versions",
                "IE 10"
                ]
         }),
        normalize()
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./css'))

});

gulp.task('server', ['css'], () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task('min:img', () =>
    gulp.src('./img/dev/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./img'))
);


gulp.task('default', ['server']);