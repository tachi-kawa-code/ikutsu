import { Database } from "https://deno.land/x/denodb/mod.ts";
import { TaskModel } from "./model.ts";
import {
  RequestTask,
  Task,
  DateParamsValidated,
} from "../type.ts";

const db = new Database("mysql", {
  host: "db",
  username: "root",
  password: "root",
  database: "test_db",
});

export const create = async (_task: RequestTask) => {
  db.link([TaskModel]);
  await TaskModel.create([
    {
      name: _task.name,
      start: `${_task.start.year}/${_task.start.month}/${_task.start.date}`,
      end: `${_task.end.year}/${_task.end.month}/${_task.end.date}`,
      target_amount: _task.target_amount,
    },
  ]);
  await db.close();
};

export const update = (_task: RequestTask) =>
  async (id: number) => {
    db.link([TaskModel]);
    await TaskModel.where("id", id).update({
      name: _task.name,
      start: `${_task.start.year}/${_task.start.month}/${_task.start.date}`,
      end: `${_task.end.year}/${_task.end.month}/${_task.end.date}`,
      target_amount: _task.target_amount,
    });
    await db.close();
  };

export const getById = async (id: number) => {
  db.link([TaskModel]);
  const results = await TaskModel.where("id", id).get() as Task[];
  await db.close();
  return results;
};

export const getByDate = async (_date: DateParamsValidated) => {
  db.link([TaskModel]);
  const date = `${_date.year}/${_date.month}/${_date.date}`;
  const results = await TaskModel.where("start", "<=", date)
    .where("end", ">=", date)
    .get() as Task[];
  await db.close();
  return results;
};

export const deleteById = async (id: number) => {
  db.link([TaskModel]);
  await TaskModel.where("id", id).delete();
  await db.close();
};
