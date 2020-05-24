import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { DateParamsValidated } from "../type.ts";
import { getByDate } from "../db/mod.ts";

export const getMiddleware = async (context: RouterContext) => {
  const now = new Date();
  const nowParam: DateParamsValidated = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
  };
  const result = await getByDate(nowParam);

  if (result.length <= 0) {
    context.response.body = { message: "本日のタスク無し" };
    return;
  }

  context.response.body = JSON.stringify(result);
};
