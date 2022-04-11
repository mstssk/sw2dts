sw2dts 
------

[![npm version](https://badge.fury.io/js/sw2dts.svg)](https://badge.fury.io/js/sw2dts)
[![GitHub Actions](https://github.com/mstssk/sw2dts/workflows/CI/badge.svg)](https://github.com/mstssk/sw2dts/actions)

Generates TypeScript definition file(d.ts) from swagger.json for edge cases.

## Attention

[sw2dts](https://www.npmjs.com/package/sw2dts) wraps [dtsgenerator](https://www.npmjs.com/package/dtsgenerator)
to provides several features for **edge cases**.

I recommend to use [dtsgenerator](https://www.npmjs.com/package/dtsgenerator) directly or other generators such as [Swagger Codegen](https://swagger.io/tools/swagger-codegen/), if you use swagger generally.

## Install

```
$ npm install -g sw2dts
```

or, install with `--save-dev` option to use in [npm scripts](https://docs.npmjs.com/misc/scripts).

## Usage

```
  Usage: sw2dts [options] [--] [input_filename]

  Options:

    -w, --with-query                With GET query parameters.
    -s, --sort-props                Sort type properties order.
    -o, --output <output_filename>  Output to file.
    -n, --namespace <namespace>     Use namespace.
    --stdin                         [Deprecated] Input from standard input.
```

- *input_filename* should be swagger.json(or yaml) file.

### Example

```
$ sw2dts swagger.json > output.d.ts
$ sw2dts -o output.d.ts swagger.json
$ sw2dts --namespace foo -o output.d.ts swagger.json
$ cat swagger.json | sw2dts -swo output.d.ts
```

#### Tips

Use sw2dts in your script.

Sample:

```ts
import * as sw2dts from 'sw2dts';

let data: sw2dts.SwaggerSpec = { /* swagger data */ };

let option: sw2dts.ConverterOptions = {
    namespace: 'foo',
    
    // includes GET query parameters.
    withQuery: true, 
    
    // modify GET query parameters interface name.
    nameResolver: (path: string, pathDefinition: sw2dts.PathDefinition, options: sw2dts.ConverterOptions) => {
        return 'any name as you like'; // WARN: sw2dts will convert this name to PascalCase.
    }
};

sw2dts.convert(data, option).then(dts => {
    console.log(dts);
});
```

## How to build

```
npm cit
```
