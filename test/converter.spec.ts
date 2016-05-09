import * as fs from "fs";
import * as assert from "assert";
import converter from "../lib/converter";

describe('converter', () => {
    it('should can convert', function(done) {
        const file = fs.readFileSync("test/files/swagger.json").toString();
        const dts = fs.readFileSync("test/files/swagger.json.d.ts");
        converter(JSON.parse(file)).then((model: string) => {
            assert(!!model);
            assert.equal(model, dts);
            done();
        });
    });
});
