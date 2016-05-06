const fs = require("fs");
const assert = require('assert');
const converter = require("../lib/converter");

describe('converter', () => {
    it('should can convert', function (done) {
        const file = fs.readFileSync("test/files/swagger.json");
        const dts = fs.readFileSync("test/files/swagger.json.d.ts");
        converter(JSON.parse(file), model => {
            assert(!!model);
            assert.equal(model, dts);
            done();
        });
    });
});
