import gulp from 'gulp';

import chord from '../index';
import upperCase from './foo.plugin';
import output from './bar.plugin';

gulp.task('build', function () {
    return gulp.src([
        'f1.txt',
        'f2.txt',
        'f3.txt',
    ], { cwd: 'files' })
        .pipe(chord.filter())
        .pipe(upperCase())
        .pipe(chord.join())
        .pipe(output());
});

gulp.task('watch', ['build'], function () {
    return gulp.watch(['files/**/*.txt'], ['build']);
});

gulp.task('default', ['watch']);
