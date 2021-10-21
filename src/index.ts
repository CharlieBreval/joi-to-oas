import _ from "lodash";
import OpenApiFile from "../types";

type HttpMethods =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";

type ParamsSchema = {
  [propertyName: string]: {
    type: string;
    default: string | number;
  };
};

const buildPath = ({
  jsonRpcUrl,
  jsonRpcMethod,
  jsonRpcVersion = "2.0",
  httpMethod = "post",
  contentType = "application/json",
  paramsSchema,
}: {
  jsonRpcUrl: string;
  jsonRpcMethod: string;
  jsonRpcVersion?: string;
  httpMethod: HttpMethods;
  contentType: string;
  paramsSchema: ParamsSchema;
}) => {
  const schema = {
    type: "object",
    properties: {
      jsonrpc: {
        type: "string",
        default: jsonRpcVersion,
        description: "JSON-RPC Version",
      },
      id: {
        type: "string",
        default: "999",
        description: "Id of the request",
      },
      method: {
        type: "string",
        default: jsonRpcMethod,
        description: "The JsonRpcMethodName",
      },
      params: {
        type: "object",
        properties: paramsSchema,
      },
    },
  };

  return {
    [jsonRpcUrl]: {
      [httpMethod]: {
        requestBody: {
          content: {
            [contentType]: {
              schema,
            },
          },
        },
      },
    },
  };
};

type PathParameter = {
  jsonRpcMethod?: string;
  jsonRpcUrl: string;
  httpMethod: HttpMethods;
  contentType: string;
  paramsSchema: ParamsSchema;
};

export const joiToJson = ({
  defaultConfig,
  paths,
}: {
  defaultConfig?: any;
  paths?: PathParameter[];
}): OpenApiFile => {
  const json: OpenApiFile = {};

  // Iterate over the default json configuration
  for (var key in defaultConfig) {
    if (key in defaultConfig) {
      json[key] = defaultConfig[key];
    }
  }

  if (paths) {
    const filteredPaths = _.uniqBy(paths, "url") as PathParameter[];
    const openApiPaths = filteredPaths.reduce(
      (
        carry,
        { jsonRpcUrl, jsonRpcMethod, httpMethod, contentType, paramsSchema }
      ) => {
        return buildPath({
          jsonRpcUrl,
          jsonRpcMethod,
          httpMethod,
          contentType,
          paramsSchema,
        });
      },
      {}
    );

    json.paths = openApiPaths;
  }

  return json;
};
