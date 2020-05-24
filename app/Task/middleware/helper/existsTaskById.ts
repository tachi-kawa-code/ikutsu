import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { getById } from "../../db/mod.ts";

export const existsTaskById = async (
  context: RouterContext<{ id: string }>,
  next: () => Promise<void>,
) => {
  const targetId = Number(context.params.id);
  const hasData = (await getById(targetId)).length > 0;
  if (!hasData) {
    context.throw(Status.NotFound, "Not Found");
  }
  await next();
};
