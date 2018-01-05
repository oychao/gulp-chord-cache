import gulp from 'gulp';

import cache from '../index';
import foo from './foo.plugin';

gulp.task('build', function () {
    return gulp.src([
        'f1.txt',
        'f2.txt',
        'f3.txt',
    ], { cwd: 'files' }).pipe(cache.filter()).pipe(foo()).pipe(cache.join());
});

gulp.task('watch', ['build'], function () {
    return gulp.watch(['files/**/*.txt'], ['build']);
});

gulp.task('default', ['watch']);
