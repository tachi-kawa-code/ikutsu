import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { DateParams } from "../type.ts";
import { taskValidator } from "../taskValidator.ts";
import { TaskParams } from "../type.ts";
import { create } from "../db/index.ts";

const existsParam = (param: any) => {
  return param.name && param.start_year && param.start_month &&
    param.start_date &&
    param.end_year && param.end_month && param.end_date && param.target_amount;
};

export const postMiddleware = async (context: RouterContext) => {
  if (!context.request.hasBody) {
    context.throw(Status.BadRequest, "Bad Request");
  }
  const body = await context.request.body();
  const params = body.value;

  if (!existsParam(params)) {
    context.throw(Status.BadRequest, "Bad Request");
  }

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
  const taskValid = taskValidator(
    params.name,
    start,
    end,
    params.target_amount,
  );

  if (!taskValid.isValid) {
    context.response.body = JSON.stringify({ error: taskValid.error });
    context.throw(Status.BadRequest, taskValid.error);
    return;
  }

  const task: TaskParams = {
    name: params.name,
    start,
    end,
    target_amount: params.target_amount,
  };

  await create(task);

  context.response.body = JSON.stringify(body.value);
};
