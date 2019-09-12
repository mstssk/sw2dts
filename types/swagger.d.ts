// ---- Swagger Specifications ----

export interface SwaggerSpec {
  [key: string]: any; // allow anything else properties.
  paths?: {
    [path: string]: PathDefinition;
  };
  definitions?: {
    [name: string]: SchemaDefinition;
  };
  // FIXME: Support OpenAPI 3 patchy
  components?: {
    schemas?: {
      [name: string]: SchemaDefinition;
    };
  };
}
export interface PathDefinition {
  get?: {
    [key: string]: any; // allow anything else properties.
    description?: string;
    parameters?: ParameterObject[];
  };
  post?: any;
}
/** http://swagger.io/specification/#parameterObject */
export interface ParameterObject {
  name: string;
  in: "query" | "header" | "path" | "formData" | "body";
  required?: boolean;
  type?: SchemaType;
  // FIXME: Support OpenAPI 3 patchy
  enum?: string[];
  items?: ItemsObject;
  schema?: SchemaObject;
}
export interface SchemaObject {
  type?: SchemaType;
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
    $ref?: string;
    enum?: string[];
    items?: {
      format?: string;
      type?: SchemaType;
      enum?: string[];
    };
  };
}
export type SchemaType = "string" | "number" | "integer" | "boolean" | "array" | "file";
