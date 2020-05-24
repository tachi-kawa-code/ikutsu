import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";

const idRegex = /^[0-9]+$/;

export const enableParamId = async (
  context: RouterContext<{ id: string }>,
  next: () => Promise<void>,
) => {
  const enableParam = context.params && context.params.id.match(idRegex);
  if (!enableParam) {
    context.throw(Status.BadRequest, "Bad Request");
  }
  await next();
};
