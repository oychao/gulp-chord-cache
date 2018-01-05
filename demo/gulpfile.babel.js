import gulp from 'gulp';
import cache from '../index';

gulp.task('default', function () {
    return gulp.src([
        'f1.txt',
        'f2.txt',
        'f3.txt',
    ], { cwd: 'files' }).pipe(cache.filter()).pipe(cache.test()).pipe(cache.join());
});
