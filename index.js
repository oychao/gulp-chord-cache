const through = require('through2');
// const PluginError = require('plugin-error');

const chord = { caches: {} }

chord.filter = function () {
    return through.obj(function (file, enc, callback) {
        let contents = file.contents.toString();

        const cachedFile = chord.caches[file.path];
        if (typeof cachedFile !== undefined && cachedFile === contents) {
            file.cached = true;
            contents = '';
        } else {
            file.cached = false;
            chord.caches[file.path] = contents;
        }

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

chord.join = function () {
    return through.obj(function (file, enc, callback) {
        let contents = file.contents.toString();

        if (file.cached) {
            contents = chord.caches[file.path];
        }

        console.log(contents);

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

module.exports = chord;
