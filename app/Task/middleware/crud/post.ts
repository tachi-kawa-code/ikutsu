import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { DateParams } from "../../type.ts";
import { RequestTask } from "../../type.ts";
import { create } from "../../db/mod.ts";

export const postMiddleware = async (context: RouterContext) => {
  const body = await context.request.body();
  const params = body.value;

  const start: DateParams = {
    year: params.start_year,
    month: params.start_month,
    date: params.start_date,
  };
  const end: DateParams = {
    year: params.end_year,
    month: params.end_month,
    date: params.end_date,
  };

  const task: RequestTask = {
    name: params.name,
    start,
    end,
    target_amount: params.target_amount,
  };

  await create(task);

  context.response.body = JSON.stringify(body.value);
};
