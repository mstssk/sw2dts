"use strict";

import dtsgen from "dtsgenerator";

export default function converter(data: SwaggerSpec, options: ConverterOptions = {}): Promise<string> {
    let namespace = options.namespace ? `${options.namespace}/` : "";
    let jsonSchemas: {}[] = [];
    for (let title in data.definitions) {
        let schema = data.definitions[title];
        fixRef(schema);
        schema.id = namespace + title;
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
                id: namespace + _resolveQueryParamsTitle(path),
                type: "object",
                properties
            };
            jsonSchemas.push(schema);
        }
    }
    return dtsgen(jsonSchemas);
}

function fixRef(obj: any) {
    for (let key in obj) {
        if (key === "$ref") {
            obj["$ref"] = obj["$ref"].split("/").pop();
        } else if (typeof obj[key] === "object") {
            fixRef(obj[key]);
        }
    }
}

export function _resolveQueryParamsTitle(path: string, options: ConverterOptions = {}) {
    path = path.replace(/{[^}]*}/g, '').replace(/\/$/, '');
    path = path.replace(/(^|[\/_-])(\w)/g, (substr, ...args) => {
        return args[1].toUpperCase();
    });
    path = path.replace(/(\d+)(\w)/, (substr, ...args) => {
        return args[0] + args[1].toUpperCase();
    })
    return path;
}

export interface ConverterOptions {
    namespace?: string;
    withQuery?: boolean;
}
