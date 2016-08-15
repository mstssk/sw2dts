interface SwaggerSpec {
    paths: {
        [path: string]: PathDefinition;
    }
    definitions: {
        [name: string]: SchemaDefinition;
    }
}
interface PathDefinition {
    get?: {
        description: string,
        parameters: {
            name: string,
            in: "query" | "header" | "path" | "formData" | "body",
            type: SchemaType;
        }[]
    },
    post?: any
}
interface SchemaDefinition {
    id?: string;
    type: string;
    properties: SchemaProperties;
}
interface SchemaProperties {
    [key: string]: {
        format?: string;
        type?: SchemaType;
        "$ref"?: string;
        items?: {
            format?: string;
            type?: SchemaType;
        }
    }
}

declare type SchemaType = "string" | "number" | "integer" | "boolean" | "array" | "file";
