const through = require('through2');
const PluginError = require('plugin-error');

const chord = {};

const input = {};
const caches = {};

const _check = function (file, enc, callback) {
    if (file.isNull()) {
        callback();
        return;
    }
    if (file.isStream()) {
        this.emit('error', new PluginError('gulp-chord-cache: stream not supported'));
        callback();
        return;
    }
};

chord.filter = function () {
    return through.obj(function (file, enc, callback) {
        _check(file, enc, callback);
        let contents = file.contents.toString();

        const cachedContents = input[file.path];
        if (typeof cachedContents !== undefined && cachedContents === contents) {
            file.cached = true;
            contents = '';
        } else {
            file.cached = false;
            input[file.path] = contents;
        }

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

chord.join = function () {
    return through.obj(function (file, enc, callback) {
        _check(file, enc, callback);
        let contents = file.contents.toString();

        if (!file.cached) {
            caches[file.path] = contents;
        } else {
            contents = caches[file.path];
        }

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

module.exports = chord;
