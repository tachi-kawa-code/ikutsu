import { Model, DATA_TYPES } from "https://deno.land/x/denodb/mod.ts";

export class Task extends Model {
  static table = "tasks";
  static timestamps = false;
  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DATA_TYPES.STRING,
    start: DATA_TYPES.DATETIME,
    end: DATA_TYPES.DATETIME,
    target_amount: DATA_TYPES.INTEGER,
  };
}
