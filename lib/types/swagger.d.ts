interface SwaggerSpec {
    paths: {
        [path: string]: {
            get?: {
                description: string,
                parameters: {
                    name: string,
                    in: "query" | "header" | "path" | "formData" | "body",
                    type: "string" | "number" | "integer" | "boolean" | "array" | "file"
                }[]
            },
            post?: any
        }
    }
    definitions: {
        [name: string]: any
    }
}
