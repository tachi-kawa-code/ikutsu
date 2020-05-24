import { DateParams, DateParamsValidated } from "./type.ts";

export type ValidateResult = {
  readonly isValid: boolean;
  readonly error?: string;
};

const numberRegex = /^[0-9]+$/;
const createValidateErrorResult = (error: string): ValidateResult => {
  return { isValid: false, error };
};
const isValidDate = (year: number, month: number, date: number) => {
  const dateObj = new Date(year, month - 1, date);
  return (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === date);
};

const isValidDateParams = (date: DateParams) => {
  if (!date.year.match(numberRegex)) {
    return createValidateErrorResult("年に数字以外含んでる");
  }
  if (!date.month.match(numberRegex)) {
    return createValidateErrorResult("月に数字以外含んでる");
  }
  if (!date.year.match(numberRegex)) {
    return createValidateErrorResult("日に数字以外含んでる");
  }
  if (!isValidDate(Number(date.year), Number(date.month), Number(date.date))) {
    return createValidateErrorResult("録な日付じゃない");
  }
  return { isValid: true };
};

const convertDateParamsToDate = (params: DateParamsValidated) =>
  new Date(params.year, params.month - 1, params.date);

export const taskValidator = (
  name: string,
  start: DateParams,
  end: DateParams,
  target_amount: string,
): ValidateResult => {
  if (!target_amount.match(numberRegex)) {
    return createValidateErrorResult("必要数に数字以外含んでる");
  }
  if (name.length > 50) {
    return createValidateErrorResult("タスク名が50字超えてる");
  }
  const isValidStart = isValidDateParams(start);
  if (!isValidStart.isValid) {
    return createValidateErrorResult(`タスク開始日 - ${isValidStart.error}`);
  }
  const isValidEnd = isValidDateParams(end);
  if (!isValidEnd.isValid) {
    return createValidateErrorResult(`タスク終了日 - ${isValidEnd.error}`);
  }
  const startDate = convertDateParamsToDate({
    year: Number(start.year),
    month: Number(start.month),
    date: Number(start.date),
  });
  const endDate = convertDateParamsToDate({
    year: Number(end.year),
    month: Number(end.month),
    date: Number(end.date),
  });
  if (startDate.getTime() > endDate.getTime()) {
    return createValidateErrorResult("開始日が終了日以降");
  }
  return { isValid: true };
};
