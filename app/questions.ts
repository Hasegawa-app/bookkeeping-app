import type { OptionSetKey, Question } from "./types";

export const optionSets: Record<OptionSetKey, string[]> = {
  sales: [
    "現金",
    "売掛金",
    "売上",
    "受取手形",
    "買掛金",
    "商品",
    "支払手数料",
    "通信費",
  ],
  purchase: [
    "現金",
    "買掛金",
    "支払手形",
    "商品",
    "仕入",
    "売掛金",
    "前払金",
    "支払手数料",
  ],
  expense: [
    "現金",
    "普通預金",
    "水道光熱費",
    "通信費",
    "旅費交通費",
    "雑費",
    "消耗品費",
    "未払金",
    "租税公課",
  ],
  asset: [
    "現金",
    "普通預金",
    "備品",
    "建物",
    "土地",
    "車両運搬具",
    "未払金",
    "買掛金",
  ],
  depreciation: [
    "減価償却費",
    "備品減価償却累計額",
    "建物減価償却累計額",
    "車両運搬具減価償却累計額",
    "備品",
    "建物",
    "車両運搬具",
    "現金",
  ],
};

/* =========================
   売上
========================= */

const salesQuestions: Question[] = [
  {
    text: "商品100,000円を売り、60,000円は現金、残額は掛けとした。",
    debit: "現金",
    debitAmount: 60000,
    debit2: "売掛金",
    debitAmount2: 40000,
    credit: "売上",
    creditAmount: 100000,
    explanation: "現金と売掛金に分ける。",
    optionSetKey: "sales",
  },
  {
    text: "商品95,000円を売り、代金は掛けとした。",
    debit: "売掛金",
    debitAmount: 95000,
    credit: "売上",
    creditAmount: 95000,
    explanation: "掛け売上。",
    optionSetKey: "sales",
  },
  {
    text: "商品60,000円を売り、代金は現金で受け取った。",
    debit: "現金",
    debitAmount: 60000,
    credit: "売上",
    creditAmount: 60000,
    explanation: "現金売上。",
    optionSetKey: "sales",
  },
  {
    text: "商品140,000円を売り、40,000円は現金、残額は掛けとした。",
    debit: "現金",
    debitAmount: 40000,
    debit2: "売掛金",
    debitAmount2: 100000,
    credit: "売上",
    creditAmount: 140000,
    explanation: "現金＋売掛。",
    optionSetKey: "sales",
  },
  {
    text: "商品75,000円を売り、受取手形で受け取った。",
    debit: "受取手形",
    debitAmount: 75000,
    credit: "売上",
    creditAmount: 75000,
    explanation: "手形受取。",
    optionSetKey: "sales",
  },
];

/* =========================
   仕入
========================= */

const purchaseQuestions: Question[] = [
  {
    text: "商品105,000円を仕入れ、代金は掛けとした。",
    debit: "仕入",
    debitAmount: 105000,
    credit: "買掛金",
    creditAmount: 105000,
    explanation: "掛け仕入。",
    optionSetKey: "purchase",
  },
  {
    text: "商品35,000円を仕入れ、現金で支払った。",
    debit: "仕入",
    debitAmount: 35000,
    credit: "現金",
    creditAmount: 35000,
    explanation: "現金仕入。",
    optionSetKey: "purchase",
  },
  {
    text: "商品125,000円を仕入れ、25,000円現金、残額は掛け。",
    debit: "仕入",
    debitAmount: 125000,
    credit: "現金",
    creditAmount: 25000,
    credit2: "買掛金",
    creditAmount2: 100000,
    explanation: "現金＋買掛金。",
    optionSetKey: "purchase",
  },
];

/* =========================
   費用
========================= */

const expenseQuestions: Question[] = [
  {
    text: "通信費14,000円を現金で支払った。",
    debit: "通信費",
    debitAmount: 14000,
    credit: "現金",
    creditAmount: 14000,
    explanation: "費用支払い。",
    optionSetKey: "expense",
  },
  {
    text: "雑費2,500円を普通預金から支払った。",
    debit: "雑費",
    debitAmount: 2500,
    credit: "普通預金",
    creditAmount: 2500,
    explanation: "普通預金支払い。",
    optionSetKey: "expense",
  },
  {
    text: "租税公課12,000円を普通預金から支払った。",
    debit: "租税公課",
    debitAmount: 12000,
    credit: "普通預金",
    creditAmount: 12000,
    explanation: "税金支払い。",
    optionSetKey: "expense",
  },
];

/* =========================
   資産
========================= */

const assetQuestions: Question[] = [
  {
    text: "備品130,000円を普通預金で購入。",
    debit: "備品",
    debitAmount: 130000,
    credit: "普通預金",
    creditAmount: 130000,
    explanation: "資産取得。",
    optionSetKey: "asset",
  },
  {
    text: "土地700,000円を購入し、200,000円現金、残額未払。",
    debit: "土地",
    debitAmount: 700000,
    credit: "現金",
    creditAmount: 200000,
    credit2: "未払金",
    creditAmount2: 500000,
    explanation: "現金＋未払。",
    optionSetKey: "asset",
  },
];

/* =========================
   減価償却
========================= */

const depreciationQuestions: Question[] = [
  {
    text: "建物の減価償却費32,000円（間接法）。",
    debit: "減価償却費",
    debitAmount: 32000,
    credit: "建物減価償却累計額",
    creditAmount: 32000,
    explanation: "間接法。",
    optionSetKey: "depreciation",
  },
  {
    text: "備品の減価償却費14,000円（間接法）。",
    debit: "減価償却費",
    debitAmount: 14000,
    credit: "備品減価償却累計額",
    creditAmount: 14000,
    explanation: "間接法。",
    optionSetKey: "depreciation",
  },
];

/* =========================
   統合
========================= */

export const questions: Question[] = [
  ...salesQuestions,
  ...purchaseQuestions,
  ...expenseQuestions,
  ...assetQuestions,
  ...depreciationQuestions,
];