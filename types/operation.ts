import Parameter from './parameter';
import Server from './server';

type ExternalDocumentation = {
  description: string;
  url: string;
}

type Header = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
}

type Example = {
  summary: string;
  description: string;
  value:any;
  externalValue: string;
}

type Encoding = {
  contentType?: string;
  headers?: {
    [headerName: string]: Header;
  };
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

type Schema = {
  type: string;
  properties: Schema;
  description: string;
  default: any;
}

type MediaType = {
  schema: Schema;
  example: any;
  examples: {
    [exampleName: string]: Example
  };
  encoding: {
    [encodingName: string]: Encoding;
  }
}

type RequestBody = {
  description: string;
  content: {
    [mediaTypeName: string]: MediaType;
  };
  required: boolean;
}


type Link = {
  operationRef: string;
  operationId: string;
  parameters: {
    [parameterName: string]: any;
  };
  requestBody: any;
  description: string;
  server: Server;
}

type Response = {
  description: string;
  headers: {
    [headerName: string]: Header;
  };
  content: {
    [contentName: string]: MediaType;
  };
  links: {
    [linkName: string]: Link;
  }
}

type SecurityRequirement = {
  [authName: string]: string[];
}


type Operation = {
  tags: string[];
  summary: string;
  description: string;
  externalDocs: ExternalDocumentation;
  operationId: string;
  parameters:	Parameter[];
  requestBody: RequestBody;
  responses: {
    [httpStatusCode: number]: Response
  }
  callbacks: {
    [callbackName:string]: any;
  }
  deprecated:boolean;
  security: SecurityRequirement;
  servers: Server[];
}

export default Operation;