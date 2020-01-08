import * as fs from "fs";
import * as util from "util";
import * as commandpost from "commandpost";
import * as YAML from "js-yaml";
import { convert } from "./converter";

const pkg = require("../package.json");

interface RootOptions {
  output: string[];
  namespace: string[];
  withQuery: boolean;
  sortProps: boolean;
}

const root = commandpost
  .create<RootOptions, { input_filename: string }>("sw2dts [input_filename]")
  .version(pkg.version, "-v, --version")
  .option("-w, --with-query", "With GET query parameters.")
  .option("-s, --sort-props", "Sort type properties order.")
  .option("-o, --output <output_filename>", "Output to file.")
  .option("-n, --namespace <namespace>", "Use namespace.")
  .action(async (opts, args) => {
    const outputFilename = opts.output[0];
    const namespace = opts.namespace[0];
    const withQuery = opts.withQuery;
    const sortProps = opts.sortProps;

    const input = await (args.input_filename ? fromFile(args.input_filename) : fromStdin());
    const model = await convert(YAML.safeLoad(input), { namespace, withQuery, sortProps });

    if (outputFilename) {
      fs.writeFileSync(outputFilename, model);
    } else {
      process.stdout.write(model);
    }
    process.exit(0);
  });

commandpost.exec(root, process.argv).catch(errorHandler);

function fromStdin() {
  process.stdin.setEncoding("utf-8");
  return new Promise<string>((resolve, reject) => {
    let data = "";
    process.stdin
      .on("data", chunk => (data += chunk))
      .once("end", () => resolve(data))
      .once("error", err => reject(err));
    setTimeout(() => {
      if (data) {
        return;
      }
      reject();
    }, 1000);
  });
}

function fromFile(inputFileName: string) {
  return util.promisify(fs.readFile)(inputFileName, { encoding: "utf-8" });
}

function errorHandler(err: Error) {
  if (err == null) {
    process.stdout.write(root.helpText());
    process.exit(0);
    return;
  }
  if (err.stack) {
    console.error(err.stack);
  } else if (err) {
    console.error(err);
  }
  process.exit(1);
}
