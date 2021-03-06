## [2.6.3](https://github.com/mstssk/sw2dts/compare/v2.6.2...v2.6.3) (2020-06-18)

* Updates dependencies for some security fixes.
* Drop support Node.js 8 and Node.js 11.

## [2.6.2](https://github.com/mstssk/sw2dts/compare/v2.6.1...v2.6.2) (2019-06-05)


### Features

* Delegate '--namespace' option to dtsgenerator ([026d765](https://github.com/mstssk/sw2dts/commit/026d765))

### Bug Fixes

* Update dependencies.
    * Fix some security issues in dependencies.


<a name="2.6.1"></a>
## [2.6.1](https://github.com/mstssk/sw2dts/compare/v2.6.0...v2.6.1) (2018-08-28)

* Add LICENSE file.
    * Fix [#34](https://github.com/mstssk/sw2dts/issues/34).


<a name="2.6.0"></a>
# [2.6.0](https://github.com/mstssk/sw2dts/compare/v2.5.0...v2.6.0) (2018-05-21)

* Fix [#29](https://github.com/mstssk/sw2dts/issues/29).
* Updates dependencies: dtsgenerator@1.0.0, and so on.


<a name="2.5.0"></a>
# [2.5.0](https://github.com/mstssk/sw2dts/compare/v2.4.0...v2.5.0) (2017-11-18)


### Features

* Add short options for --with-query and --sort-props ([35ba48a](https://github.com/mstssk/sw2dts/commit/35ba48a))
* Read from stdin automatically. ([252fc7d](https://github.com/mstssk/sw2dts/commit/252fc7d))

You have been used complicated options:

```
cat swagger.json | sw2dts --stdin --sort-props --with-query --output output.d.ts
```

You can use easily now:

```
cat swagger.json | sw2dts -swo output.d.ts
```

<a name="2.4.0"></a>
# [2.4.0](https://github.com/mstssk/sw2dts/compare/v2.3.0...v2.4.0) (2017-06-08)


### Features

* Support 'required' property for GET query parameters. ([2d177d3](https://github.com/mstssk/sw2dts/commit/2d177d3))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/mstssk/sw2dts/compare/v2.2.0...v2.3.0) (2017-01-04)


### Features

* Add --sort-props option ([89cc506](https://github.com/mstssk/sw2dts/commit/89cc506))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/mstssk/sw2dts/compare/v2.1.4...v2.2.0) (2016-12-26)


### Features

* enum in parameters ([cbb8413](https://github.com/mstssk/sw2dts/commit/cbb8413))
* Update TypeScript v2.1.4 ([ed20d0b](https://github.com/mstssk/sw2dts/commit/ed20d0b))



<a name="2.1.4"></a>
## [2.1.4](https://github.com/mstssk/sw2dts/compare/v2.1.3...v2.1.4) (2016-11-01)


### Bug Fixes

* fix CI and publishing problems. ([f44a221](https://github.com/mstssk/sw2dts/commit/f44a221))



<a name="2.1.3"></a>
## [2.1.3](https://github.com/mstssk/sw2dts/compare/v2.1.2...v2.1.3) (2016-11-01)


### Bug Fixes

* add keywords in package.json [#10](https://github.com/mstssk/sw2dts/issues/10) ([d447a55](https://github.com/mstssk/sw2dts/commit/d447a55))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/mstssk/sw2dts/compare/v2.1.1...v2.1.2) (2016-09-15)


### Bug Fixes

* [#9](https://github.com/mstssk/sw2dts/issues/9) ([b1918c0](https://github.com/mstssk/sw2dts/commit/b1918c0))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/mstssk/sw2dts/compare/v2.0.0...v2.1.1) (2016-09-07)


### Bug Fixes

* tslint ([2163bac](https://github.com/mstssk/sw2dts/commit/2163bac))


### Features

* add index.d.ts ([adc2116](https://github.com/mstssk/sw2dts/commit/adc2116))
* add yaml spec ([222674c](https://github.com/mstssk/sw2dts/commit/222674c))
* include swagger type definitions into converter.d.ts ([b2ac20a](https://github.com/mstssk/sw2dts/commit/b2ac20a))
* make 'name resolver' optional ([38f1848](https://github.com/mstssk/sw2dts/commit/38f1848))
* namespace sholud be as users like ([f4bf8c5](https://github.com/mstssk/sw2dts/commit/f4bf8c5))
* namespace sholud be CamelCase ([e4f4222](https://github.com/mstssk/sw2dts/commit/e4f4222))
* simplify swagger type definition ([08dcb2d](https://github.com/mstssk/sw2dts/commit/08dcb2d))
* YAML support ([cca568e](https://github.com/mstssk/sw2dts/commit/cca568e))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mstssk/sw2dts/compare/v1.0.5...v2.0.0) (2016-07-14)


### Features

* namespace sholud be CamelCase ([0ab10d1](https://github.com/mstssk/sw2dts/commit/0ab10d1))
* remove default suffix ([dee57c7](https://github.com/mstssk/sw2dts/commit/dee57c7))
* update dtsgenerator0.7.1 ([7790d61](https://github.com/mstssk/sw2dts/commit/7790d61))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/mstssk/sw2dts/compare/v1.0.4...v1.0.5) (2016-05-16)



<a name="1.0.4"></a>
## [1.0.4](https://github.com/mstssk/sw2dts/compare/v1.0.0...v1.0.4) (2016-05-16)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mstssk/sw2dts/compare/v0.1.0...v1.0.0) (2016-05-15)



<a name="0.1.0"></a>
# 0.1.0 (2016-05-06)



