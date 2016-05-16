sw2dts 
------

[![Circle CI](https://circleci.com/gh/mstssk/sw2dts.svg?style=svg)](https://circleci.com/gh/mstssk/sw2dts)

Generates TypeScript definition file(d.ts) from swagger.json

**Warning!** :
Should use version 1.0.4 and above.
Old versions are broken.

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
    -o, --output <output_filename>  Output to file.
    -n, --namespace <namespace>     Use namespace.
```

### Example

```
$ sw2dts swagger.json > output.d.ts
$ sw2dts -o output.d.ts swagger.json
$ sw2dts --namespace foo -o output.d.ts swagger.json
$ cat swagger.json | sw2dts --stdin -o output.d.ts
```
