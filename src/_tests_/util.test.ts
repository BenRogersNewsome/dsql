import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.125.0/testing/asserts.ts";
import { init } from "../util.ts";
import { ExecuteQueryFunction } from "../types.ts";

const mockExecuteQuery: ExecuteQueryFunction = async <T>(sqlString: string) => {
  return [
    sqlString as unknown as T,
  ] as Array<T>;
};

Deno.test("Query function", async () => {
  const { Query } = init(mockExecuteQuery);

  const variable = "hello";
  const res = await Query<string>`
        test query with var: ${variable}
    `;

  assertEquals(res[0].trim(), "test query with var: hello");
});

Deno.test("SQL function", async () => {
  const { SQL } = init(mockExecuteQuery);

  const variable = "hello";
  const query = SQL<string, { input: number }>`
        test query with var: ${variable}, and computed var ${({ input }) =>
    input + 10}
    `;

  const res = await query({
    input: 10,
  });

  assertEquals(
    res[0].trim(),
    "test query with var: hello, and computed var 20",
  );
});

Deno.test("SQL function with non-string type", async () => {
  const { SQL } = init(mockExecuteQuery);

  const query = SQL<string, { input: number }>`
        test query with var: ${10}
    `;

  const res = await query({
    input: 10,
  });

  assertEquals(res[0].trim(), "test query with var: 10");
});
