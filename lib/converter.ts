import dtsgen from "dtsgenerator";

export async function convert(data: SwaggerSpec, options: ConverterOptions = {}) {
    if (!options.nameResolver) {
        options.nameResolver = PascalCaseNameResolver;
    }
    const namespace = (options.namespace || "");
    const jsonSchemas: SchemaDefinition[] = [];
    for (const title in data.definitions) {
        const schema = data.definitions[title];
        fixRef(schema);
        schema.id = title;
        jsonSchemas.push(schema);
    }
    if (options.withQuery) {
        for (const path in (data.paths || [])) {
            const props = data.paths[path];
            if (!props.get || isEmpty(props.get.parameters)
                || props.get.parameters.some(v => v.in !== "query")) {
                continue;
            }
            const required: string[] = [];
            const properties = props.get.parameters.reduce((result, value) => {
                result[value.name] = {
                    type: value.type,
                    items: value.items,
                    enum: value.enum,
                };
                if (value.required) {
                    required.push(value.name);
                }
                return result;
            }, {} as SchemaProperties);
            const schema: SchemaDefinition = {
                id: options.nameResolver(path, props, options),
                type: "object",
                properties,
                required,
            };
            jsonSchemas.push(schema);
        }
    }
    if (options.sortProps) {
        jsonSchemas.filter(sd => !!sd.properties).forEach(sd => {
            sd.properties = Object.keys(sd.properties).sort().reduce((result, key) => {
                result[key] = sd.properties[key];
                return result;
            }, {} as SchemaProperties);
        });
    }
    let text = await dtsgen({ contents: jsonSchemas });
    if (!namespace) {
        return text;
    }
    text = text.split("\n").join("\n    ").trim();
    return `declare namespace ${namespace} {\n    ${text}\n}\n`;
}

function fixRef(obj: any) {
    for (const key in obj) {
        if (key === "$ref") {
            obj["$ref"] = obj["$ref"].split("/").pop();
        } else if (typeof obj[key] === "object") {
            fixRef(obj[key]);
        }
    }
}

function isEmpty(array: any[]) {
    return array ? !array.length : true;
}

/**
 * Default name resolver which resolve name as PascalCase from path string.
 */
export function PascalCaseNameResolver(path: string, pathDefinition: PathDefinition, options: ConverterOptions) {
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
    sortProps?: boolean;
    nameResolver?: (path: string, pathDefinition: PathDefinition, options: ConverterOptions) => string;
}

// TODO separate below type definitions into another file.
// ---- Swagger Specifications ----

export interface SwaggerSpec {
    [key: string]: any; // allow anything else properties.
    paths?: {
        [path: string]: PathDefinition;
    };
    definitions?: {
        [name: string]: SchemaDefinition;
    };
}
export interface PathDefinition {
    get?: {
        [key: string]: any; // allow anything else properties.
        description?: string,
        parameters?: ParameterObject[]
    };
    post?: any;
}
/** http://swagger.io/specification/#parameterObject */
export interface ParameterObject {
    name: string;
    in: "query" | "header" | "path" | "formData" | "body";
    required?: boolean;
    type: SchemaType;
    enum?: string[];
    items?: ItemsObject;
}
/** http://swagger.io/specification/#itemsObject */
export interface ItemsObject {
    type?: SchemaType;
    enum?: string[];
}
export interface SchemaDefinition {
    id?: string;
    type: string;
    properties?: SchemaProperties;
    required?: string[];
}
export interface SchemaProperties {
    [key: string]: {
        format?: string;
        type?: SchemaType;
        "$ref"?: string;
        enum?: string[];
        items?: {
            format?: string;
            type?: SchemaType;
            enum?: string[];
        };
    };
}
export type SchemaType = "string" | "number" | "integer" | "boolean" | "array" | "file";
