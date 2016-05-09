import * as fs from "fs";
import * as commandpost from "commandpost";
import converter from "./converter";

const pkg = require("../package.json");

interface RootOptions {
    output: string;
}

const root = commandpost
    .create<RootOptions, { input_filename: string }>("sw2dts [input_filename]")
    .version(pkg.version, "-v, --version")
    .option("-o, --output <output_filename>", "Output to file.")
    .action((opts, args) => {
        let promise: Promise<string> = null;
        if (args.input_filename) {
            promise = fromFile(args.input_filename);
        } else if (fs.fstatSync((process.stdin as any).fd).size) {
            promise = fromStdin();
        } else {
            process.stdout.write(root.helpText());
            return;
        }

        promise.then(input => {
            return converter(JSON.parse(input));
        }).then(model => {
            if (opts.output) {
                fs.writeFileSync(opts.output, model);
            } else {
                console.log(model);
            }
        });
    });

commandpost
    .exec(root, process.argv)
    .catch(errorHandler);

function fromStdin(): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = "";
        process.stdin.setEncoding("utf-8");
        process.stdin.on("readable", () => {
            let chunk: any;
            while (chunk = process.stdin.read()) {
                if (typeof chunk === "string") {
                    data += chunk;
                }
            }
        });
        process.stdin.on("end", () => {
            resolve(data);
        });
    });
}

function fromFile(inputFileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let file = fs.readFileSync(inputFileName, { encoding: "utf-8" });
        resolve(file);
    });
}

function errorHandler(err: Error) {
    if (err instanceof Error) {
        console.error(err.stack);
    } else {
        console.error(err);
    }
    return Promise.resolve(null).then(() => {
        process.exit(1);
    });
}
