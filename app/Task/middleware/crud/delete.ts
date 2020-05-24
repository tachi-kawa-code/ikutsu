import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import { getById, deleteById } from "../../db/mod.ts";

export const deleteMiddleware = async (
  context: RouterContext<{ id: string }>,
) => {
  const targetId = Number(context.params.id);
  const data = await getById(targetId);

  await deleteById(targetId);

  context.response.status = Status.OK;
  context.response.body = {
    id: targetId,
    ...data[0],
  };
};
