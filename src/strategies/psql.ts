import { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { ExecuteQueryFunction } from "../types.ts";

export const postgres = (client: Client): ExecuteQueryFunction =>
  async <T = Record<string, unknown>>(sqlString: string) => {
    const result = await client.queryObject<T>(sqlString);
    return result.rows;
  };
