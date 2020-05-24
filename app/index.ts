import { Application, Router } from "https://deno.land/x/oak/mod.ts";

type Book = {
  readonly id: string;
  readonly title: string;
  readonly author: string;
};

const books = new Map<string, Book>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author",
});

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "ROUTING";
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
      return;
    }
    const notfound = {
      body: "NOT FOUND",
    };
    context.response.body = JSON.stringify(notfound);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
