import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  getMiddleware,
  deleteMiddleware,
  putMiddleware,
  postMiddleware,
  validateRequestBody,
  enableParamId,
  existsTaskById,
} from "./middleware/mod.ts";

const router = new Router();
router
  .get("/task", getMiddleware)
  .post("/task", validateRequestBody, postMiddleware)
  .put<{ id: string }>(
    "/task/:id",
    enableParamId,
    existsTaskById,
    validateRequestBody,
    putMiddleware,
  )
  .delete<{ id: string }>(
    "/task/:id",
    enableParamId,
    existsTaskById,
    deleteMiddleware,
  );

const app = new Application();
app.use(async (context, next) => {
  context.response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3001",
  );
  context.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
