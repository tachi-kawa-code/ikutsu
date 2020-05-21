import { DateObject } from "./type.ts";

export const periodGenerator = (start: DateObject, end: DateObject): string => {
  const startText = `${start.year}/${pad(start.month)}/${pad(start.day)}`;
  const endText = `${end.year}/${pad(end.month)}/${pad(end.day)}`;
  return `${startText} - ${endText}`;
};

const pad = (num: number) => {
  return ("00" + String(num)).slice(-2);
};
