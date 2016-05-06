sw2dts 
------

[![Circle CI](https://circleci.com/gh/mstssk/sw2dts.svg?style=svg)](https://circleci.com/gh/mstssk/sw2dts)

Generates TypeScript definition file(d.ts) from swagger.json

## Install

```
$ npm install -g sw2dts
```

## Usage

```
$ sw2dts swagger.json > output.d.ts
$ sw2dts -o output.d.ts swagger.json
$ cat swagger.json | sw2dts -o output.d.ts
```

