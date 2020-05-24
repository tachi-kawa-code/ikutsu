import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { update } from "../../db/mod.ts";
import { DateParams, RequestTask } from "../../type.ts";

export const putMiddleware = async (context: RouterContext<{ id: string }>) => {
  const targetId = Number(context.params.id);

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
