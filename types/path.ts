import Server from './server';
import Parameter from './parameter';
import Operation from './operation';

type Path = {
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
  servers?: Server[]
  parameters?: Parameter[];
};

export default Path;
