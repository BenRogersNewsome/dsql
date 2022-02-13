import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import { createSQLString } from "../tags.ts";

Deno.test("template tags are parsed correctly", () => {
  const variable = "hello";

  const sqlString = createSQLString`
        ${variable} world
    `;

  assertEquals(sqlString.trim(), "hello world");
});
