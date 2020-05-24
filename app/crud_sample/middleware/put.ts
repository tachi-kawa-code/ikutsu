import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { getById, update } from "../db/index.ts";
import { DateParams, TaskParams } from "../type.ts";
import { taskValidator } from "../taskValidator.ts";

const idRegex = /^[0-9]+$/;

export const putMiddleware = async (context: RouterContext<{ id: string }>) => {
  const enableParam = context.params && context.params.id.match(idRegex);
  if (!enableParam) {
    context.throw(Status.BadRequest, "Bad Request");
  }
  const targetId = Number(context.params.id);

  const hasData = (await getById(targetId)).length > 0;

  if (!hasData) {
    context.throw(Status.NotFound, "Not Found");
  }

  if (!context.request.hasBody) {
    context.throw(Status.BadRequest, "Bad Request");
  }
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
  const taskValid = taskValidator(
    params.name,
    start,
    end,
    params.target_amount,
  );

  if (!taskValid.isValid) {
    context.response.body = JSON.stringify({ error: taskValid.error });
    context.throw(Status.BadRequest, taskValid.error);
  }

  const task: TaskParams = {
    name: params.name,
    start,
    end,
    target_amount: params.target_amount,
  };

  await update(task)(targetId);

  context.response.status = Status.OK;
  context.response.body = {
    id: targetId,
    name: task.name,
    start: `${task.start.year}/${task.start.month}/${task.start.date}`,
    end: `${task.end.year}/${task.end.month}/${task.end.date}`,
    target_amount: task.target_amount,
  };
};
