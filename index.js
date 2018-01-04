const through = require('through2');
// const PluginError = require('plugin-error');

const chord = { caches: {} };

chord.filter = function () {
    return through.obj(function (file, enc, callback) {
        const contents = file.contents.toString().toUpperCase();
        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};
chord.join = function () {
    return through.obj(function (file, enc, callback) {
        console.log(file.contents.toString());
        this.push(file);
        callback();
    });
};

module.exports = chord;
