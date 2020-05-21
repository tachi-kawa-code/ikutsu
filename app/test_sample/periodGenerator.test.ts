import { periodGenerator } from "./periodGenerator.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { DateObject } from "./type.ts";

Deno.test("periodGenerator: 2020/12/15 - 2020/12/31", () => {
  const expected = "2020/12/15 - 2020/12/31";
  const start: DateObject = {
    year: 2020,
    month: 12,
    day: 15,
  };
  const end: DateObject = {
    year: 2020,
    month: 12,
    day: 31,
  };
  const actual = periodGenerator(start, end);
  assertEquals(actual, expected);
});

Deno.test("periodGenerator: 2020/01/01 - 2020/01/09", () => {
  const expected = "2020/01/01 - 2020/01/09";
  const start: DateObject = {
    year: 2020,
    month: 1,
    day: 1,
  };
  const end: DateObject = {
    year: 2020,
    month: 1,
    day: 9,
  };
  const actual = periodGenerator(start, end);
  assertEquals(actual, expected);
});
