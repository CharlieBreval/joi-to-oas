import oasConfig from "./oasConfig.json";
import { joiToJson } from "./index";

test("it should respond a json object", () => {
  expect(joiToJson({})).toEqual({});
});

test("it should handle simple line from configuration file", () => {
  const jsonResult = joiToJson({
    defaultConfig: oasConfig,
  });
  expect(jsonResult.openapi).toEqual("3.0.0");
});

test("it should handle urls from configuration file", () => {
  const jsonResult = joiToJson({
    defaultConfig: oasConfig,
  });
  expect(jsonResult.servers).toEqual([
    {
      url: "https://ginko.preprod.thefork.io",
      description: "preprod url",
    },
    {
      url: "https://biloba.thefork.io",
      description: "production url",
    },
  ]);
});

test("it should handle info from configuration file", () => {
  const jsonResult = joiToJson({
    defaultConfig: oasConfig,
  });
  expect(jsonResult.info).toEqual({
    description:
      "This service is made to get information coming from a restaurant",
    version: "1.0.0",
    title: "restaurant-service",
  });
});

test("it is possible to add one path", () => {
  const jsonResult = joiToJson({
    defaultConfig: oasConfig,
    paths: [
      {
        jsonRpcUrl: "/thisismyroute",
        jsonRpcMethod: "getRestaurant",
        httpMethod: "post",
        contentType: "application/json",
        paramsSchema: {
          id: {
            type: "integer",
            default: 1884,
          },
        },
      },
    ],
  });

  expect(Object.keys(jsonResult.paths)).toHaveLength(1);
});

test("it is not possible to add two path with the same url", () => {
  const jsonResult = joiToJson({
    defaultConfig: oasConfig,
    paths: [
      {
        jsonRpcUrl: "/thisismyroute",
        jsonRpcMethod: "getRestaurant",
        contentType: "application/json",
        httpMethod: "post",
        paramsSchema: {
          id: {
            type: "integer",
            default: 1884,
          },
        },
      },
      {
        jsonRpcUrl: "/thisismyroute",
        jsonRpcMethod: "getRestaurantConfiguration",
        httpMethod: "post",
        contentType: "application/json",
        paramsSchema: {
          restaurantUuid: {
            type: "string",
            default: "2b2ed104-a473-4798-a8a1-3e30931745ce",
          },
        },
      },
    ],
  });

  console.log(JSON.stringify(jsonResult));

  expect(Object.keys(jsonResult.paths)).toHaveLength(1);
});