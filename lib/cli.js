"use strict";

const fs = require("fs");
const commandpost = require("commandpost");
const converter = require("./converter");
const pkg = require("../package.json");

const root = commandpost
    .create("sw2dts [input_filename]")
    .version(pkg.version, "-v, --version")
    .option("-o <output_filename>", "Output to file.")
    .action((opts, args) => {
        let outputFileName = opts.O ? opts.O[0] : null;
        let callback = (model) => {
            if (outputFileName) {
                fs.writeFileSync(outputFileName, model);
            } else {
                console.log(model);
            }
        };
        if (args.input_filename) {
            fromFile(args.input_filename, callback);
        } else if (fs.fstatSync(process.stdin.fd).size) {
            fromStdin(callback);
        } else {
            process.stdout.write(root.helpText());
        }
    });

commandpost
    .exec(root, process.argv)
    .catch(errorHandler);

function fromStdin(callback) {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("readable", () => {
        let chunk;
        while (chunk = process.stdin.read()) {
            if (typeof chunk === "string") {
                data += chunk;
            }
        }
    });
    process.stdin.on("end", () => {
        converter(JSON.parse(data), callback);
    });
}

function fromFile(inputFileName, callback) {
    let file = fs.readFileSync(inputFileName, { encoding: "utf-8" });
    converter(JSON.parse(file), callback);
}

function errorHandler(err) {
    if (err instanceof Error) {
        console.error(err.stack);
    } else {
        console.error(err);
    }
    return Promise.resolve(null).then(() => {
        process.exit(1);
    });
}