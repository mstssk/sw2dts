import * as fs from "fs";
import * as assert from "assert";
import converter from "../lib/converter";

describe('converter', () => {
    it('should can convert', (done) => {
        const file = fs.readFileSync("test/fixtures/swagger.json").toString();
        const dts = fs.readFileSync("test/fixtures/swagger.json.d.ts").toString();
        converter(JSON.parse(file))
            .then((model: string) => {
                assert(!!model);
                assert.equal(model, dts);
                done();
            }).catch(done);
    });

    it('should can convert with namespace', (done) => {
        const file = fs.readFileSync("test/fixtures/swagger.json").toString();
        const dts = fs.readFileSync("test/fixtures/namespace1.d.ts").toString();
        converter(JSON.parse(file), { namespace: "foo" })
            .then((model: string) => {
                assert(!!model);
                assert.equal(model, dts);
                done();
            }).catch(done);
    });
});
