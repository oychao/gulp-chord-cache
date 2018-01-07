# gulp-chord-cache

Cache files in gulp pipe.

## Why gulp-chord-cache

Normally in gulp watch tasks, if one single file changed every watched file will be handled in a triggered task.

For example, compiling all files is unnecessary and inefficient because only one file is changed in most cases.

gulp-chord-cache will filter unchanged files and cache all handled files in formmer flow, the more files you are dealing with, the faster flows using gulp-chord-cache could be.

## How it works

gulp-chord-cache caches all handled file contents in memory, when task is triggered next time, only changed files can be passed into the flow at the entry point(which is `chord.filter()`), other files will use caches at the exit point(which is `chord.join()`).

You may ask how do unchanged files get restored at the exit point, gulp-chord-cache did a little trick to implement this, it replaced all unchanged file contens with an empty string at the entry point, then restored caches back at the exit pointer, so basically unchanged file contents did pass through the flow, but they were empty strings there.

## How to use

Install gulp-chord-cache.

```bash
yarn add gulp-chord-cache
```

Configure packages.json and gulpfile.js

```json
    ...
    "scripts": {
        "build": "gulp"
    },
    ...
```

```javascript
const gulp = 'gulp';
const chord from 'gulp-chord-cache';

gulp.task('build', function () {
    return gulp.src([
        // source fiels
    ])
        // other plugins
        .pipe(chord.filter()) // <-- entry pointer
        // other plugins, only changed files will be handled
        .pipe(chord.join()) // <-- exit pointer
        // other plugins
        // ...
});

// 'build' task will be triggered before 'watch' task
gulp.task('watch', ['build'], function () {
    return gulp.watch([
        // source fiels
    ], ['build']);
});

gulp.task('default', ['watch']);
```

Run your task

```bash
yarn build
```

## License

[![](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)](http://www.wtfpl.net/)

[1]: https://github.com/oychao/gulp-chord-cache/tree/master/demo
