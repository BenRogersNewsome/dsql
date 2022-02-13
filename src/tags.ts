export const createSQLString = (
  strings: TemplateStringsArray,
  ...vars: string[]
) => {
  let sqlStr = "";
  strings.forEach((string, i) => {
    sqlStr += string + (vars[i] || "");
  });
  return sqlStr;
};
