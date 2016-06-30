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

export interface ConverterOptions {
    namespace?: string;
}
