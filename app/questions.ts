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
  adjustment: [
  "未払費用",
  "前払費用",
  "貸倒引当金",
  "貸倒引当金繰入",
  "減価償却費",
  "建物減価償却累計額",
  "備品減価償却累計額",
  "水道光熱費",
  "保険料",
  "売掛金",
]
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
    explanation:
      "商品を売ったため貸方は売上100,000円となる。60,000円はその場で受け取っているので借方は現金、残り40,000円は後日回収するため売掛金となる。",
    optionSetKey: "sales",
  },
  {
    text: "商品95,000円を売り、代金は掛けとした。",
    debit: "売掛金",
    debitAmount: 95000,
    credit: "売上",
    creditAmount: 95000,
    explanation:
      "商品を売ったため貸方は売上。代金は後日受け取るため借方は売掛金となる。",
    optionSetKey: "sales",
  },
  {
    text: "商品60,000円を売り、代金は現金で受け取った。",
    debit: "現金",
    debitAmount: 60000,
    credit: "売上",
    creditAmount: 60000,
    explanation:
      "商品を売ったため貸方は売上。代金をその場で受け取っているので借方は現金となる。",
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
    explanation:
      "商品を売ったため貸方は売上140,000円。40,000円は現金で受け取り、残り100,000円は後日回収するため売掛金となる。",
    optionSetKey: "sales",
  },
  {
    text: "商品75,000円を売り、受取手形で受け取った。",
    debit: "受取手形",
    debitAmount: 75000,
    credit: "売上",
    creditAmount: 75000,
    explanation:
      "商品を売ったため貸方は売上。代金を手形で受け取っているので借方は受取手形となる。",
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
    explanation:
      "商品を仕入れたため借方は仕入。代金は後日支払うため貸方は買掛金となる。",
    optionSetKey: "purchase",
  },
  {
    text: "商品35,000円を仕入れ、現金で支払った。",
    debit: "仕入",
    debitAmount: 35000,
    credit: "現金",
    creditAmount: 35000,
    explanation:
      "商品を仕入れたため借方は仕入。代金を現金で支払っているので貸方は現金となる。",
    optionSetKey: "purchase",
  },
  {
    text: "商品125,000円を仕入れ、25,000円を現金で支払い、残額を掛けとした。",
    debit: "仕入",
    debitAmount: 125000,
    credit: "現金",
    creditAmount: 25000,
    credit2: "買掛金",
    creditAmount2: 100000,
    explanation:
      "仕入のため借方は仕入125,000円。25,000円は現金で支払い、残り100,000円は後日支払うため買掛金となる。",
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
    explanation:
      "通信費は費用の発生なので借方に記入する。現金で支払っているため貸方は現金となる。",
    optionSetKey: "expense",
  },
  {
    text: "雑費2,500円を普通預金から支払った。",
    debit: "雑費",
    debitAmount: 2500,
    credit: "普通預金",
    creditAmount: 2500,
    explanation:
      "雑費は費用なので借方に記入する。普通預金から支払っているため貸方は普通預金となる。",
    optionSetKey: "expense",
  },
  {
    text: "租税公課12,000円を普通預金から支払った。",
    debit: "租税公課",
    debitAmount: 12000,
    credit: "普通預金",
    creditAmount: 12000,
    explanation:
      "税金の支払いは租税公課として借方に記入する。普通預金から支払っているため貸方は普通預金となる。",
    optionSetKey: "expense",
  },
];

/* =========================
   資産
========================= */

const assetQuestions: Question[] = [
  {
    text: "備品130,000円を普通預金で購入した。",
    debit: "備品",
    debitAmount: 130000,
    credit: "普通預金",
    creditAmount: 130000,
    explanation:
      "備品という資産を取得したため借方は備品となる。代金を普通預金から支払っているため貸方は普通預金となる。",
    optionSetKey: "asset",
  },
  {
    text: "土地700,000円を購入し、200,000円を現金で支払い、残額は後日支払いとした。",
    debit: "土地",
    debitAmount: 700000,
    credit: "現金",
    creditAmount: 200000,
    credit2: "未払金",
    creditAmount2: 500000,
    explanation:
      "土地という資産を取得したため借方は土地700,000円。200,000円は現金で支払い、残り500,000円は未払金となる。",
    optionSetKey: "asset",
  },
];

/* =========================
   減価償却
========================= */

const depreciationQuestions: Question[] = [
  {
    text: "3月31日の決算において、当期首に取得し使用を開始した建物（取得原価￥6,000、耐用年数30年、残存価額はゼロ）の減価償却を定額法により行った。",
    debit: "減価償却費",
    debitAmount: 200,
    credit: "建物減価償却累計額",
    creditAmount: 200,
  explanation:
  "減価償却費は費用なので借方に記入する。6,000円÷30年＝200円より当期の減価償却費は200円となる。間接法では資産を直接減らさず、貸方に減価償却累計額を計上する。",
    optionSetKey: "depreciation",
  },
  {
    text: "備品の減価償却費14,000円を間接法で計上した。",
    debit: "減価償却費",
    debitAmount: 14000,
    credit: "備品減価償却累計額",
    creditAmount: 14000,
    explanation:
      "減価償却費は費用として借方に記入する。間接法のため貸方は備品減価償却累計額となる。",
    optionSetKey: "depreciation",
  },
];
/* =========================
   調整
========================= */

const adjustmentQuestions: Question[] = [
  {
  text: "電気代10,000円は未払いである。",
  debit: "水道光熱費",
  debitAmount: 10000,
  credit: "未払費用",
  creditAmount: 10000,
  explanation:
    "当期の費用であるため借方は水道光熱費とする。まだ支払っていないため貸方は未払費用となる。",
  optionSetKey: "adjustment",
},
  {
  text: "保険料12,000円のうち、3,000円は来期分である。",
  debit: "前払費用",
  debitAmount: 3000,
  credit: "保険料",
  creditAmount: 3000,
  explanation:
    "来期分は当期の費用ではないため前払費用に振り替える。よって借方は前払費用、貸方は保険料となる。",
  optionSetKey: "adjustment",
},
  {
  text: "売掛金100,000円に対し、2%の貸倒引当金を設定した。",
  debit: "貸倒引当金繰入",
  debitAmount: 2000,
  credit: "貸倒引当金",
  creditAmount: 2000,
  explanation:
    "100,000円×2%＝2,000円より貸倒引当金を設定する。費用として貸倒引当金繰入を借方、貸倒引当金を貸方に計上する。",
  optionSetKey: "adjustment",
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
  ...adjustmentQuestions,
];