let fs = require('fs');

module.exports = {

    readSchemas: function (path, callback) {

        fs.readdir(path, function (err, files) {

            if (err) {
                return callback(err);
            }

            var schemas = {};

            files.forEach(function (file) {

                fs.readFile(path + '/' + file, "utf-8", function (err, schema){

                    if (err) {
                        return callback(err);
                    }

                    let APIARY_INDENT = "\n            ";
                    let fileName = file.substring(0, file.lastIndexOf('.'));

                    schema = schema.replace(/\n/g, APIARY_INDENT);
                    schemas[fileName] = schema;

                });

            });

            callback(null, schemas);
        });
    }
};








