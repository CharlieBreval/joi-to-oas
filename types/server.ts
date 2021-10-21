type Server = {
  url: string;
  description?: string;
  variables?: {
    [variableKey: string]: {
      default?: string;
      description?: string;
      enum?: string[];
    };
  };
};

export default Server;