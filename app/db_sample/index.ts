import { Database } from "https://deno.land/x/denodb/mod.ts";
import { Task } from "./model.ts";

const db = new Database("mysql", {
  host: "db",
  username: "root",
  password: "root",
  database: "test_db",
});

db.link([Task]);

await Task.create([{
  name: "Task01",
  start: "2020/01/01",
  end: "2020/01/31",
  target_amount: 20,
}]);

await db.close();
