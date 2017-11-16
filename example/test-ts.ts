import * as sw2dts from 'sw2dts';

let data: sw2dts.SwaggerSpec = {
    "swagger": "2.0",
    "info": {
        "title": "Test",
        "version": "v1"
    },
    "schemes": [
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/api/dummy": {
            "get": {
                "tags": [
                    "Dummy"
                ],
                "description": "Get dummy data.",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "response of GET /api/dummy",
                        "schema": {
                            "$ref": "#/definitions/Dummy"
                        }
                    }
                }
            }
        },
        "/api/dummy/model": {
            "get": {
                "tags": [
                    "Dummy"
                ],
                "description": "Get dummy model data.",
                "parameters": [
                    {
                        "name": "required",
                        "in": "query",
                        "type": "boolean",
                        "required": true
                    },
                    {
                        "name": "cursor",
                        "in": "query",
                        "type": "string"
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "type": "integer"
                    },
                    {
                        "name": "offset",
                        "in": "query",
                        "type": "number"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "response of GET /api/dummy",
                        "schema": {
                            "$ref": "#/definitions/Dummy"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "Dummy": {
            "type": "object",
            "properties": {
                "image": {
                    "$ref": "#/definitions/Image"
                },
                "createdAt": {
                    "format": "date-time",
                    "type": "string"
                },
                "id": {
                    "format": "int64",
                    "type": "string"
                },
                "kind": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "note": {
                    "type": "string"
                },
                "count": {
                    "format": "int32",
                    "type": "integer"
                },
                "updatedAt": {
                    "format": "date-time",
                    "type": "string"
                },
                "ids": {
                    "type": "array",
                    "items": {
                        "format": "int64",
                        "type": "string"
                    }
                }
            }
        },
        "Image": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "format": "date-time",
                    "type": "string"
                },
                "fileSize": {
                    "format": "int32",
                    "type": "integer"
                },
                "height": {
                    "format": "int32",
                    "type": "integer"
                },
                "id": {
                    "format": "int64",
                    "type": "string"
                },
                "updatedAt": {
                    "format": "date-time",
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
                "width": {
                    "format": "int32",
                    "type": "integer"
                }
            }
        },
        "Noop": {
            "type": "object"
        }
    },
    "tags": [
        {
            "name": "Dummy",
            "description": "Dummy"
        }
    ]
};

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

// declare module "sw2dts" {
//     function sw2dts(d:any):any;
//     export = sw2dts;
// }

