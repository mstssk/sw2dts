import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import * as nexpect from "nexpect";
import * as rimraf from "rimraf";
import * as mkdirp from "mkdirp";

describe("CLI", () => {
    const sw2dtsPath = path.resolve(__dirname, "../bin/sw2dts");
    const fixturesDir = path.resolve(process.cwd(), "test/fixtures");
    const testWorkingDir = path.resolve(process.cwd(), "test-cli");

    beforeEach(() => {
        rimraf.sync(testWorkingDir);
        mkdirp.sync(testWorkingDir);
    });

    it("no args", (done) => {
        nexpect
            .spawn("node", [sw2dtsPath])
            .run((err, stdout, exit) => {
                assert(!!stdout.join(''));
                assert(!err);
                assert(exit === 0);
                done();
            });
    });

    it("invalid input path should be error", (done) => {
        nexpect
            .spawn("node", [sw2dtsPath, "invalid-path"])
            .run((err, stdout, exit) => {
                assert(exit === 1, "should be exit(1)");
                done();
            });
    });

    it("file to stdout", (done) => {
        const swaggerJsonPath = path.resolve(fixturesDir, "swagger.json");
        const expectedPath = path.resolve(fixturesDir, "swagger.json.d.ts");
        nexpect
            .spawn("node", [sw2dtsPath, swaggerJsonPath])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(!err);
                assert(exit === 0);
                done();
            });
    });

    it("file to stdout with namespace", (done) => {
        const swaggerJsonPath = path.resolve(fixturesDir, "swagger.json");
        const expectedPath = path.resolve(fixturesDir, "namespace1.d.ts");
        nexpect
            .spawn("node", [sw2dtsPath, swaggerJsonPath, "-n", "foo"])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(!err);
                assert(exit === 0);
                done();
            });
    });

    it("stdin to stdout", (done) => {
        const testShell = path.resolve(fixturesDir, "stdin2stdout.sh");
        const expectedPath = path.resolve(fixturesDir, "swagger.json.d.ts");
        nexpect
            .spawn("sh", [testShell])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(!err, "should not error");
                assert(exit === 0, "should exit(0).");
                done();
            });
    });

    it("file to out file", (done) => {
        const swaggerJsonPath = path.resolve(fixturesDir, "swagger.json");
        const expectedPath = path.resolve(fixturesDir, "swagger.json.d.ts");
        const outputPath = `${testWorkingDir}/output.d.ts`;
        nexpect
            .spawn("node", [sw2dtsPath, swaggerJsonPath, "--output", outputPath])
            .run((err, stdout, exit) => {
                const actual = fs.readFileSync(outputPath).toString();
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(stdout.join("") === "", "stdout should be empty.");
                assert(!err, "should not error");
                assert(exit === 0, "should exit(0).");
                done();
            });
    });

    it("stdin to out file", (done) => {
        const testShell = path.resolve(fixturesDir, "stdin2file.sh");
        const expectedPath = path.resolve(fixturesDir, "swagger.json.d.ts");
        const outputPath = `${testWorkingDir}/output.d.ts`;
        nexpect
            .spawn("sh", [testShell, outputPath])
            .run((err, stdout, exit) => {
                const actual = fs.readFileSync(outputPath).toString();
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(stdout.join("") === "", "stdout should be empty.");
                assert(!err, "should not error");
                assert(exit === 0, "should exit(0).");
                done();
            });
    });

    it("file to stdout with query params", (done) => {
        const swaggerJsonPath = path.resolve(fixturesDir, "swagger.json");
        const expectedPath = path.resolve(fixturesDir, "with-query-params.d.ts");
        nexpect
            .spawn("node", [sw2dtsPath, "--with-query", swaggerJsonPath])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(!err);
                assert(exit === 0);
                done();
            });
    });

    it("file to stdout with query params and namespace", (done) => {
        const swaggerJsonPath = path.resolve(fixturesDir, "swagger.json");
        const expectedPath = path.resolve(fixturesDir, "namespace.with-query-params.d.ts");
        nexpect
            .spawn("node", [sw2dtsPath, "--with-query", "-n", "foo", swaggerJsonPath])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(!err);
                assert(exit === 0);
                done();
            });
    });

    it("yaml to stdout", done => {
        const srcPath = path.resolve(fixturesDir, "error_model.yml");
        const expectedPath = path.resolve(fixturesDir, "error_model.d.ts");
        nexpect
            .spawn("node", [sw2dtsPath, srcPath])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedPath).toString();
                assert.equal(actual, expected);
                assert(!err);
                assert(exit === 0);
                done();
            });
    });
});
