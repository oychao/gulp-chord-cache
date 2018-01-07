const through = require('through2');

module.exports = function () {
    return through.obj(function (file, enc, callback) {
        let contents = file.contents.toString();

        console.log(contents);

        file.contents = Buffer.from(contents, enc);
        this.push(file);
        callback();
    });
};
