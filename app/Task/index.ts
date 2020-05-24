import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  getMiddleware,
  deleteMiddleware,
  putMiddleware,
  postMiddleware,
} from "./middleware/mod.ts";

const router = new Router();
router
  .get("/task", getMiddleware)
  .post("/task", postMiddleware)
  .put<{ id: string }>("/task/:id", putMiddleware)
  .delete<{ id: string }>("/task/:id", deleteMiddleware);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
