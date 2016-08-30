"use strict";

import dtsgen from "dtsgenerator";

export function convert(data: SwaggerSpec, options: ConverterOptions = {}): Promise<string> {
    'use strict';
    if (!options.nameResolver) {
        options.nameResolver = PascalCaseNameResolver;
    }
    let namespace = (options.namespace || "");
    let jsonSchemas: {}[] = [];
    for (let title in data.definitions) {
        let schema = data.definitions[title];
        fixRef(schema);
        schema.id = title;
        jsonSchemas.push(schema);
    }
    if (options.withQuery) {
        for (let path in (data.paths || [])) {
            let props = data.paths[path];
            if (!props.get || !props.get.parameters.length
                || props.get.parameters.some(v => v.in !== "query")) {
                continue;
            }
            let properties = props.get.parameters.reduce((result, value) => {
                result[value.name] = { type: value.type };
                return result;
            }, {} as SchemaProperties);
            let schema: SchemaDefinition = {
                id: options.nameResolver(path, props, options),
                type: "object",
                properties
            };
            jsonSchemas.push(schema);
        }
    }
    return dtsgen(jsonSchemas).then(text => {
        if (!namespace) {
            return text;
        }
        text = text.split("\n").join("\n    ").trim();
        return `declare namespace ${namespace} {\n    ${text}\n}\n`;
    });
}

function fixRef(obj: any) {
    'use strict';
    for (let key in obj) {
        if (key === "$ref") {
            obj["$ref"] = obj["$ref"].split("/").pop();
        } else if (typeof obj[key] === "object") {
            fixRef(obj[key]);
        }
    }
}

/**
 * Default name resolver which resolve name as PascalCase from path string.
 */
export function PascalCaseNameResolver(path: string, pathDefinition: PathDefinition, options: ConverterOptions): string {
    'use strict';
    options = options || {};
    path = path.replace(/{[^}]*}/g, '').replace(/\/$/, '');
    path = path.replace(/(^|[\/_-])(\w)/g, (substr, ...args) => {
        return args[1].toUpperCase();
    });
    path = path.replace(/(\d+)(\w)/, (substr, ...args) => {
        return args[0] + args[1].toUpperCase();
    });
    return path;
}

export interface ConverterOptions {
    namespace?: string;
    withQuery?: boolean;
    nameResolver?: (path: string, pathDefinition: PathDefinition, options: ConverterOptions) => string;
}

// TODO separate below type definitions into another file.
// ---- Swagger Specifications ----

export interface SwaggerSpec {
    paths?: {
        [path: string]: PathDefinition;
    };
    definitions?: {
        [name: string]: SchemaDefinition;
    };
}
export interface PathDefinition {
    get?: {
        description: string,
        parameters: {
            name: string,
            in: "query" | "header" | "path" | "formData" | "body",
            type: SchemaType;
        }[]
    };
    post?: any;
}
export interface SchemaDefinition {
    id?: string;
    type: string;
    properties: SchemaProperties;
}
export interface SchemaProperties {
    [key: string]: {
        format?: string;
        type?: SchemaType;
        "$ref"?: string;
        items?: {
            format?: string;
            type?: SchemaType;
        }
    };
}
export type SchemaType = "string" | "number" | "integer" | "boolean" | "array" | "file";
