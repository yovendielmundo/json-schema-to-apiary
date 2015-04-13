#!/usr/bin/env node --harmony -use-strict

let fs = require("fs");
let Handlebars = require("Handlebars");
let jsonSchemas = require("./json-schemas.js");
let util = require("util");


let argv = require("optimist")
                .usage("Usage: jsonschematoapib -s [json-schemas-dir] -a [apib-file] -r")
                .demand(['s', 'a'])
                .alias('s', "json-schemas-dir")
                .describe('s', "Directory where json-schemas are located")
                .alias('a', "apib-file")
                .describe('a', "Apiary file")
                .boolean('r')
                .describe('r', "Rewrite original Apiary file")
                .argv;

let schemasDir = argv.s;
let apiaryFile = argv.a;
let apiaryFileOut = argv.r ? apiaryFile : apiaryFile + ".back";


if ( !fs.existsSync(schemasDir) ) {
    util.error("Not is a directory [" + schemasDir + "]");
}

if ( !fs.existsSync(apiaryFile) ) {
    util.error("Apiary file do not exists [" + apiaryFile + "]");
}


jsonSchemas.readSchemas(schemasDir, function (err, schemas) {

    if (err) { throw err; }

    fs.readFile(apiaryFile, "utf-8", function (err, source) {

        if (err) { throw err; }

        let template = Handlebars.compile(source);
        let result = template(schemas).replace(/&quot;/g, '"');

        fs.writeFile(apiaryFileOut, result, function (err) {

            if (err) { throw err; }

            util.log('Apiari\'s saved!');

        });

    });

});

