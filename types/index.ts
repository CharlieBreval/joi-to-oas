import Server from "./server";
import Info from "./info";
import Path from "./path";

type OpenApiFile = {
  openapi?: string;
  servers?: Server[];
  info?: Info;
  paths?: {
    [url: string]: Path;
  };
};

export default OpenApiFile;
