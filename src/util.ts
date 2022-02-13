import { ExecuteQueryFunction, SqlInterface } from "./types.ts";
import { createSQLString } from "./tags.ts";
import {
  Generator,
  QueryFunction,
  SQLFunction,
  TemplateVarType,
} from "./types.ts";

export const init = (executeQuery: ExecuteQueryFunction): SqlInterface => {
  const Query: QueryFunction = <Result>(
    strings: TemplateStringsArray,
    ...vars: Array<any>
  ) => {
    const sqlString = createSQLString(strings, ...vars);

    const rows = executeQuery<Result>(sqlString);
    return rows;
  };

  const SQL: SQLFunction = <Result, Args>(
    strings: TemplateStringsArray,
    ...vars: Array<Generator<Args> | TemplateVarType>
  ) =>
    (args: Args) => {
      const mappedVars = vars.map((item) => {
        if (item instanceof Function) {
          return String(item(args));
        } else {
          return String(item);
        }
      });

      const sqlString = createSQLString(strings, ...mappedVars);

      const rows = executeQuery<Result>(sqlString);
      return rows;
    };

  return { Query, SQL };
};
