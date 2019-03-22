/* eslint-env mocha */
import * as fs from "fs";
import assert from "assert";
import { convert, PascalCaseNameResolver } from "../lib/converter";

describe("converter", () => {
  it("should can convert", done => {
    const file = fs.readFileSync("test/fixtures/swagger.json").toString();
    const dts = fs.readFileSync("test/fixtures/swagger.json.d.ts").toString();
    convert(JSON.parse(file))
      .then((model: string) => {
        assert(!!model);
        assert.equal(model, dts);
        done();
      })
      .catch(done);
  });

  it("should can convert with namespace", done => {
    const file = fs.readFileSync("test/fixtures/swagger.json").toString();
    const dts = fs.readFileSync("test/fixtures/namespace1.d.ts").toString();
    convert(JSON.parse(file), { namespace: "foo" })
      .then((model: string) => {
        assert(!!model);
        assert.equal(model, dts);
        done();
      })
      .catch(done);
  });

  it("query params enum", done => {
    const file = fs.readFileSync("test/fixtures/parameters_query.json").toString();
    const dts = fs.readFileSync("test/fixtures/parameters_query.d.ts").toString();
    convert(JSON.parse(file), { withQuery: true })
      .then((model: string) => {
        assert(!!model);
        assert.equal(model, dts);
        done();
      })
      .catch(done);
  });

  it("nested definitions", done => {
    const file = fs.readFileSync("test/fixtures/nested_definitions.json").toString();
    const dts = fs.readFileSync("test/fixtures/nested_definitions.d.ts").toString();
    convert(JSON.parse(file), { withQuery: true })
      .then((model: string) => {
        assert(!!model);
        assert.equal(model, dts);
        done();
      })
      .catch(done);
  });

  it("PascalCaseNameResolver", () => {
    const pd = {};
    const opt = {};
    assert.equal(PascalCaseNameResolver("abc", pd, opt), "Abc");
    assert.equal(PascalCaseNameResolver("/abc", pd, opt), "Abc");
    assert.equal(PascalCaseNameResolver("/api/dummy/model", pd, opt), "ApiDummyModel");
    assert.equal(PascalCaseNameResolver("/api/dummy/model/", pd, opt), "ApiDummyModel");
    assert.equal(PascalCaseNameResolver("api-dummy-model", pd, opt), "ApiDummyModel");
    assert.equal(PascalCaseNameResolver("api_dummy_model", pd, opt), "ApiDummyModel");
    assert.equal(PascalCaseNameResolver("/api/dummy/model/{id}", pd, opt), "ApiDummyModel");
    assert.equal(PascalCaseNameResolver("foo1bar", pd, opt), "Foo1Bar");
  });
});
