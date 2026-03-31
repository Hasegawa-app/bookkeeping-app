export type OptionSetKey =
  | "sales"
  | "purchase"
  | "expense"
  | "asset"
  | "depreciation"
  | "adjustments";

export type Question = {
  text: string;
  debit: string;
  debitAmount: number;
  debit2?: string;
  debitAmount2?: number;
  credit: string;
  creditAmount: number;
  credit2?: string;
  creditAmount2?: number;
  explanation: string;
  optionSetKey: OptionSetKey;
};

export type AnswerLine = {
  account: string;
  amount: string;
};