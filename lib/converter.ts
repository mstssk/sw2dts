import dtsgen from "dtsgenerator";
import { SwaggerSpec, PathDefinition, SchemaDefinition, SchemaProperties } from "../types/swagger";

export async function convert(data: SwaggerSpec, options: ConverterOptions = {}) {
  if (!options.nameResolver) {
    options.nameResolver = PascalCaseNameResolver;
  }
  const jsonSchemas: SchemaDefinition[] = [];
  for (const title in data.definitions) {
    const schema = data.definitions[title];
    fixRef(schema);
    schema.id = title;
    jsonSchemas.push(schema);
  }
  if (options.withQuery) {
    for (const path in data.paths || []) {
      if (!data.paths) {
        continue;
      }
      const props = data.paths[path];
      if (
        !props.get ||
        !props.get.parameters ||
        !props.get.parameters.length ||
        props.get.parameters.some(v => v.in !== "query")
      ) {
        continue;
      }
      const required: string[] = [];
      const properties = props.get.parameters.reduce<SchemaProperties>((result, value) => {
        result[value.name] = {
          type: value.type,
          items: value.items,
          enum: value.enum
        };
        if (value.required) {
          required.push(value.name);
        }
        return result;
      }, {});
      const schema: SchemaDefinition = {
        id: options.nameResolver(path, props, options),
        type: "object",
        properties,
        required
      };
      jsonSchemas.push(schema);
    }
  }
  if (options.sortProps) {
    jsonSchemas.forEach(sd => {
      if (!sd.properties) {
        return;
      }
      const srcProps = sd.properties;
      sd.properties = Object.keys(srcProps)
        .sort()
        .reduce<SchemaProperties>((result, key) => {
          result[key] = srcProps[key];
          return result;
        }, {});
    });
  }
  return await dtsgen({ contents: jsonSchemas, namespaceName: options.namespace });
}

function fixRef(obj: Record<string, any>) {
  for (const key in obj) {
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
export function PascalCaseNameResolver(path: string, pathDefinition: PathDefinition, options: ConverterOptions) {
  options = options || {};
  path = path.replace(/{[^}]*}/g, "").replace(/\/$/, "");
  path = path.replace(/(^|[/_-])(\w)/g, (substr, ...args) => {
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
