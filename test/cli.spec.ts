import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import * as nexpect from "nexpect";

describe("CLI", () => {
    const sw2dtsPath = path.resolve(__dirname, "../bin/sw2dts");
    const fixturesDir = path.resolve(process.cwd(), "test/fixtures");

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
                assert(!stdout.join("\n"));
                assert(err);
                assert(exit === 1);
                done();
            });
    });

    it("file to stdout", (done) => {
        const swaggerJsonPath = path.resolve(fixturesDir, "swagger.json");
        const expectedpath = path.resolve(fixturesDir, "swagger.json.d.ts");
        nexpect
            .spawn("node", [sw2dtsPath, swaggerJsonPath])
            .run((err, stdout, exit) => {
                const actual = stdout.join("\n") + "\n";
                const expected = fs.readFileSync(expectedpath).toString();
                assert.equal(actual, expected);
                assert(!err);
                assert(exit === 0);
                done();
            });
    });

    it("stdin to stdout", (done) => {
        // TODO
        assert.fail();
    });

    it("file to out file", (done) => {
        // TODO
        assert.fail();
    });

    it("stdin to out file", (done) => {
        // TODO
        assert.fail();
    });
});
