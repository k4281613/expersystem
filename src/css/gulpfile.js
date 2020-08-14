let gulp = require('gulp');
let px = require('gulp-px2rem-plugin');

gulp.task('px', () => {
    return gulp.src('./home.css')
        .pipe(px({ remUnit: 539.6 }))
        .pipe(gulp.dest('./css'));
});