import { Database } from "https://deno.land/x/denodb/mod.ts";
import { Task } from "./model.ts";
import {
  TaskParams,
  TaskType,
  DateParams,
  DateParamsValidated,
} from "../type.ts";

const db = new Database("mysql", {
  host: "db",
  username: "root",
  password: "root",
  database: "test_db",
});

export const create = async (_task: TaskParams) => {
  db.link([Task]);
  await Task.create([
    {
      name: _task.name,
      start: `${_task.start.year}/${_task.start.month}/${_task.start.date}`,
      end: `${_task.end.year}/${_task.end.month}/${_task.end.date}`,
      target_amount: _task.target_amount,
    },
  ]);
  await db.close();
};

export const update = (_task: TaskParams) =>
  async (id: number) => {
    db.link([Task]);
    await Task.where("id", id).update({
      name: _task.name,
      start: `${_task.start.year}/${_task.start.month}/${_task.start.date}`,
      end: `${_task.end.year}/${_task.end.month}/${_task.end.date}`,
      target_amount: _task.target_amount,
    });
    await db.close();
  };

export const getById = async (id: number) => {
  db.link([Task]);
  const results = await Task.where("id", id).get() as TaskType[];
  await db.close();
  return results;
};

export const getByDate = async (_date: DateParamsValidated) => {
  db.link([Task]);
  const date = `${_date.year}/${_date.month}/${_date.date}`;
  const results = await Task.where("start", "<=", date)
    .where("end", ">=", date)
    .get() as TaskType[];
  await db.close();
  return results;
};

export const deleteById = async (id: number) => {
  db.link([Task]);
  await Task.where("id", id).delete();
  await db.close();
};
