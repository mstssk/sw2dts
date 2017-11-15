sw2dts 
------

[![npm version](https://badge.fury.io/js/sw2dts.svg)](https://badge.fury.io/js/sw2dts)
[![Circle CI](https://circleci.com/gh/mstssk/sw2dts.svg?style=svg)](https://circleci.com/gh/mstssk/sw2dts)

Generates TypeScript definition file(d.ts) from swagger.json

## Install

```
$ npm install -g sw2dts
```

or, install with `--save-dev` option to use in [npm scripts](https://docs.npmjs.com/misc/scripts).

## Usage

```
  Usage: sw2dts [options] [--] [input_filename]

  Options:

    --stdin                         Input from standard input.
    -w, --with-query                With GET query parameters.
    -s, --sort-props                Sort type properties order.
    -o, --output <output_filename>  Output to file.
    -n, --namespace <namespace>     Use namespace.
```

- *input_filename* should be swagger.json(or yaml) file.

### Example

```
$ sw2dts swagger.json > output.d.ts
$ sw2dts -o output.d.ts swagger.json
$ sw2dts --namespace foo -o output.d.ts swagger.json
$ cat swagger.json | sw2dts --stdin -o output.d.ts
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
./setup.sh
npm test
```