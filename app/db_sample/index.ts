import { Database } from "https://deno.land/x/denodb/mod.ts";
import { Task } from "./model.ts";

const db = new Database("mysql", {
  host: "db",
  username: "root",
  password: "root",
  database: "test_db",
});

db.link([Task]);
await db.sync({ drop: true });

await Task.create([
  {
    name: "Task01",
    start: "2020/01/01",
    end: "2020/01/31",
    target_amount: 20,
  },
  {
    name: "Task02",
    start: "2020/02/01",
    end: "2020/02/07",
    target_amount: 20,
  },
  {
    name: "Task03",
    start: "2020/02/03",
    end: "2020/02/05",
    target_amount: 20,
  },
  {
    name: "Task04",
    start: "2020/02/04",
    end: "2020/02/04",
    target_amount: 20,
  },
]);

const now = "2020/02/06";
const result = await Task.where("start", "<=", now)
  .where("end", ">=", now)
  .get();

console.log(result);

await db.close();
