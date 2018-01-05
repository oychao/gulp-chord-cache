const through = require('through2');
// const PluginError = require('plugin-error');

const chord = { }

chord.filter = function () {
    return through.obj(function (file, enc, callback) {
        let contents = file.contents.toString();
        
        // do sth
        if (contents.indexOf('2') === -1) {
            file.caches = contents;
            contents = '';
        }
        
        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

chord.test = function () {
    return through.obj(function (file, enc, callback) {
        let contents = file.contents.toString();

        contents = contents.toUpperCase();

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

chord.join = function () {
    return through.obj(function (file, enc, callback) {
        let contents = file.contents.toString();

        // do sth
        if (file.caches) {
            contents = file.caches
        }

        console.log(contents);

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};

module.exports = chord;
