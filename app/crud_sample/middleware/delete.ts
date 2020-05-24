import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { getById, deleteById } from "../db/index.ts";

const idRegex = /^[0-9]+$/;

export const deleteMiddleware = async (
  context: RouterContext<{ id: string }>,
) => {
  const enableParam = context.params && context.params.id.match(idRegex);
  if (!enableParam) {
    context.throw(Status.BadRequest, "Bad Request");
  }
  const targetId = Number(context.params.id);
  const data = await getById(targetId);

  const hasData = data.length === 1;

  if (!hasData) {
    context.throw(Status.NotFound, "Not Found");
  }

  await deleteById(targetId);

  context.response.status = Status.OK;
  context.response.body = {
    id: targetId,
    ...data[0],
  };
};
