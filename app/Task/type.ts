export type TaskParams = {
  readonly name: string;
  readonly start: DateParams;
  readonly end: DateParams;
  readonly target_amount: number;
};

export type DateParams = {
  readonly year: string;
  readonly month: string;
  readonly date: string;
};

export type DateParamsValidated = {
  readonly year: number;
  readonly month: number;
  readonly date: number;
};

export type TaskType = {
  readonly name: string;
  readonly start: string;
  readonly end: string;
  readonly target_amount: number;
};
