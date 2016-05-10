import * as fs from "fs";
import * as assert from "assert";
import converter from "../lib/converter";

describe('converter', () => {
    it('should can convert', (done) => {
        const file = fs.readFileSync("test/fixtures/swagger.json").toString();
        const dts = fs.readFileSync("test/fixtures/swagger.json.d.ts").toString();
        converter(JSON.parse(file))
            .catch(done)
            .then((model: string) => {
                assert(!!model);
                assert.equal(model, dts);
                done();
            });
    });
});
