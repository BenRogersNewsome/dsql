export type TemplateFunctionArgs = [
  strings: TemplateStringsArray,
  ...vars: string[],
];

export type Rows<T> = Array<T>;

export type TemplateVarType = string | number | bigint | boolean;
export type Generator<Args = {}> = (args: Args) => TemplateVarType;

export type QueryFunction = <T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...vars: TemplateVarType[]
) => Promise<Rows<T>>;
export type SQLFunction = <T = Record<string, unknown>, Args = {}>(
  strings: TemplateStringsArray,
  ...vars: Array<Generator<Args> | TemplateVarType>
) => (args: Args) => Promise<Rows<T>>;

export type SqlInterface = {
  Query: QueryFunction;
  SQL: SQLFunction;
};

export type ExecuteQueryFunction = <T>(sqlString: string) => Promise<Rows<T>>;
