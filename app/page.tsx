import { OptionSetKey, Question } from "./types";

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

const salesQuestions: Question[] = [
  {
    text: "商品100,000円を売り、代金のうち60,000円は現金で受け取り、残額は掛けとした。",
    debit: "現金",
    debitAmount: 60000,
    debit2: "売掛金",
    debitAmount2: 40000,
    credit: "売上",
    creditAmount: 100000,
    explanation:
      "商品を売ったので貸方は売上100,000円。受け取った60,000円は借方に現金、残り40,000円は後で受け取るため借方に売掛金を記入する。",
    optionSetKey: "sales",
  },
  {
    text: "商品50,000円を売り、代金は掛けとした。",
    debit: "売掛金",
    debitAmount: 50000,
    credit: "売上",
    creditAmount: 50000,
    explanation:
      "商品を売ったので貸方は売上。代金は後で受け取るため借方は売掛金。",
    optionSetKey: "sales",
  },
  {
    text: "商品70,000円を売り、代金は現金で受け取った。",
    debit: "現金",
    debitAmount: 70000,
    credit: "売上",
    creditAmount: 70000,
    explanation:
      "商品を売ったので貸方は売上。代金をその場で現金受取しているので借方は現金。",
    optionSetKey: "sales",
  },
  {
    text: "商品120,000円を売り、20,000円は現金で受け取り、残額は掛けとした。",
    debit: "現金",
    debitAmount: 20000,
    debit2: "売掛金",
    debitAmount2: 100000,
    credit: "売上",
    creditAmount: 120000,
    explanation:
      "売上全体は120,000円。受け取った20,000円は現金、残り100,000円は売掛金。",
    optionSetKey: "sales",
  },
  {
    text: "商品90,000円を売り、代金は受取手形で受け取った。",
    debit: "受取手形",
    debitAmount: 90000,
    credit: "売上",
    creditAmount: 90000,
    explanation:
      "商品を売ったので貸方は売上。代金を約束手形で受け取ったので借方は受取手形。",
    optionSetKey: "sales",
  },
  {
    text: "商品85,000円を売り、25,000円は現金で受け取り、残額は受取手形とした。",
    debit: "現金",
    debitAmount: 25000,
    debit2: "受取手形",
    debitAmount2: 60000,
    credit: "売上",
    creditAmount: 85000,
    explanation:
      "商品を売ったので貸方は売上。受け取った25,000円は現金、残り60,000円は受取手形。",
    optionSetKey: "sales",
  },
  {
    text: "商品45,000円を売り、代金は現金で受け取った。",
    debit: "現金",
    debitAmount: 45000,
    credit: "売上",
    creditAmount: 45000,
    explanation:
      "現金売上なので借方は現金、貸方は売上。",
    optionSetKey: "sales",
  },
  {
    text: "商品160,000円を売り、80,000円は掛け、残額は受取手形で受け取った。",
    debit: "売掛金",
    debitAmount: 80000,
    debit2: "受取手形",
    debitAmount2: 80000,
    credit: "売上",
    creditAmount: 160000,
    explanation:
      "商品を売ったので貸方は売上。後払い分は売掛金、手形受取分は受取手形。",
    optionSetKey: "sales",
  },
  {
    text: "商品30,000円を売り、代金は掛けとした。",
    debit: "売掛金",
    debitAmount: 30000,
    credit: "売上",
    creditAmount: 30000,
    explanation:
      "掛け売上なので借方は売掛金、貸方は売上。",
    optionSetKey: "sales",
  },
];

const purchaseQuestions: Question[] = [
  {
    text: "商品80,000円を仕入れ、代金のうち30,000円は現金で支払い、残額は掛けとした。",
    debit: "仕入",
    debitAmount: 80000,
    credit: "現金",
    creditAmount: 30000,
    credit2: "買掛金",
    creditAmount2: 50000,
    explanation:
      "商品を仕入れたので借方は仕入80,000円。支払った30,000円は貸方に現金、残り50,000円は後払いなので貸方に買掛金を記入する。",
    optionSetKey: "purchase",
  },
  {
    text: "商品40,000円を仕入れ、代金は現金で支払った。",
    debit: "仕入",
    debitAmount: 40000,
    credit: "現金",
    creditAmount: 40000,
    explanation:
      "商品を仕入れたので借方は仕入。支払手段が現金なので貸方は現金。",
    optionSetKey: "purchase",
  },
  {
    text: "商品90,000円を仕入れ、代金は掛けとした。",
    debit: "仕入",
    debitAmount: 90000,
    credit: "買掛金",
    creditAmount: 90000,
    explanation:
      "商品を仕入れたので借方は仕入。代金は後払いなので貸方は買掛金。",
    optionSetKey: "purchase",
  },
  {
    text: "商品110,000円を仕入れ、10,000円は現金で支払い、残額は約束手形を振り出して支払った。",
    debit: "仕入",
    debitAmount: 110000,
    credit: "現金",
    creditAmount: 10000,
    credit2: "支払手形",
    creditAmount2: 100000,
    explanation:
      "仕入なので借方は仕入。現金支払分は貸方に現金、手形支払分は貸方に支払手形。",
    optionSetKey: "purchase",
  },
  {
    text: "商品55,000円を仕入れ、代金は支払手形を振り出して支払った。",
    debit: "仕入",
    debitAmount: 55000,
    credit: "支払手形",
    creditAmount: 55000,
    explanation:
      "商品を仕入れたので借方は仕入。手形を振り出して支払っているので貸方は支払手形。",
    optionSetKey: "purchase",
  },
  {
    text: "商品150,000円を仕入れ、50,000円は現金で支払い、残額は掛けとした。",
    debit: "仕入",
    debitAmount: 150000,
    credit: "現金",
    creditAmount: 50000,
    credit2: "買掛金",
    creditAmount2: 100000,
    explanation:
      "仕入総額は150,000円。現金支払分は貸方に現金、後払い分は貸方に買掛金。",
    optionSetKey: "purchase",
  },
  {
    text: "商品65,000円を仕入れ、代金は掛けとした。",
    debit: "仕入",
    debitAmount: 65000,
    credit: "買掛金",
    creditAmount: 65000,
    explanation:
      "掛け仕入なので借方は仕入、貸方は買掛金。",
    optionSetKey: "purchase",
  },
  {
    text: "商品20,000円を仕入れ、代金は現金で支払った。",
    debit: "仕入",
    debitAmount: 20000,
    credit: "現金",
    creditAmount: 20000,
    explanation:
      "現金での仕入なので借方は仕入、貸方は現金。",
    optionSetKey: "purchase",
  },
  {
    text: "商品95,000円を仕入れ、35,000円は現金で支払い、残額は支払手形を振り出した。",
    debit: "仕入",
    debitAmount: 95000,
    credit: "現金",
    creditAmount: 35000,
    credit2: "支払手形",
    creditAmount2: 60000,
    explanation:
      "現金支払分と手形支払分に分けて貸方に記入する。",
    optionSetKey: "purchase",
  },
  {
    text: "商品75,000円を仕入れ、代金は掛けとした。",
    debit: "仕入",
    debitAmount: 75000,
    credit: "買掛金",
    creditAmount: 75000,
    explanation:
      "商品を後払いで仕入れているので貸方は買掛金。",
    optionSetKey: "purchase",
  },
];

const expenseQuestions: Question[] = [
  {
    text: "通信費12,000円を現金で支払った。",
    debit: "通信費",
    debitAmount: 12000,
    credit: "現金",
    creditAmount: 12000,
    explanation:
      "費用の発生なので借方は通信費、支払手段が現金なので貸方は現金となる。",
    optionSetKey: "expense",
  },
  {
    text: "旅費交通費8,500円を現金で支払った。",
    debit: "旅費交通費",
    debitAmount: 8500,
    credit: "現金",
    creditAmount: 8500,
    explanation:
      "旅費交通費という費用が発生したので借方。現金で支払っているので貸方は現金。",
    optionSetKey: "expense",
  },
  {
    text: "水道光熱費15,000円を普通預金から支払った。",
    debit: "水道光熱費",
    debitAmount: 15000,
    credit: "普通預金",
    creditAmount: 15000,
    explanation:
      "水道光熱費は費用なので借方。普通預金からの支払いなので貸方は普通預金。",
    optionSetKey: "expense",
  },
  {
    text: "消耗品費6,000円を現金で支払った。",
    debit: "消耗品費",
    debitAmount: 6000,
    credit: "現金",
    creditAmount: 6000,
    explanation:
      "消耗品費は費用なので借方。現金支払いなので貸方は現金。",
    optionSetKey: "expense",
  },
  {
    text: "雑費3,000円を現金で支払った。",
    debit: "雑費",
    debitAmount: 3000,
    credit: "現金",
    creditAmount: 3000,
    explanation:
      "雑費は費用なので借方。現金で支払っているので貸方は現金。",
    optionSetKey: "expense",
  },
  {
    text: "租税公課9,000円を現金で支払った。",
    debit: "租税公課",
    debitAmount: 9000,
    credit: "現金",
    creditAmount: 9000,
    explanation:
      "税金などの支払いなので借方は租税公課、支払手段が現金なので貸方は現金。",
    optionSetKey: "expense",
  },
  {
    text: "通信費5,500円を普通預金から支払った。",
    debit: "通信費",
    debitAmount: 5500,
    credit: "普通預金",
    creditAmount: 5500,
    explanation:
      "通信費は費用なので借方。普通預金からの支払いなので貸方は普通預金。",
    optionSetKey: "expense",
  },
  {
    text: "旅費交通費18,000円を普通預金から支払った。",
    debit: "旅費交通費",
    debitAmount: 18000,
    credit: "普通預金",
    creditAmount: 18000,
    explanation:
      "旅費交通費の支払いなので借方は旅費交通費、貸方は普通預金。",
    optionSetKey: "expense",
  },
  {
    text: "消耗品費4,500円を普通預金から支払った。",
    debit: "消耗品費",
    debitAmount: 4500,
    credit: "普通預金",
    creditAmount: 4500,
    explanation:
      "消耗品費は費用。普通預金から支払っているので貸方は普通預金。",
    optionSetKey: "expense",
  },
  {
    text: "水道光熱費11,000円を現金で支払った。",
    debit: "水道光熱費",
    debitAmount: 11000,
    credit: "現金",
    creditAmount: 11000,
    explanation:
      "水道光熱費の現金支払いなので借方は水道光熱費、貸方は現金。",
    optionSetKey: "expense",
  },
];

const assetQuestions: Question[] = [
  {
    text: "備品150,000円を購入し、代金は翌月払いとした。",
    debit: "備品",
    debitAmount: 150000,
    credit: "未払金",
    creditAmount: 150000,
    explanation:
      "備品を購入したので借方は備品。代金はまだ支払っていないので貸方は未払金となる。",
    optionSetKey: "asset",
  },
  {
    text: "車両運搬具300,000円を購入し、100,000円を現金で支払い、残額は翌月払いとした。",
    debit: "車両運搬具",
    debitAmount: 300000,
    credit: "現金",
    creditAmount: 100000,
    credit2: "未払金",
    creditAmount2: 200000,
    explanation:
      "車両運搬具を取得したので借方は車両運搬具300,000円。支払った100,000円は貸方に現金、残額200,000円は未払金。",
    optionSetKey: "asset",
  },
  {
    text: "建物500,000円を購入し、代金は普通預金から支払った。",
    debit: "建物",
    debitAmount: 500000,
    credit: "普通預金",
    creditAmount: 500000,
    explanation:
      "建物を取得したので借方は建物。普通預金から支払っているので貸方は普通預金。",
    optionSetKey: "asset",
  },
  {
    text: "土地800,000円を購入し、代金は翌月払いとした。",
    debit: "土地",
    debitAmount: 800000,
    credit: "未払金",
    creditAmount: 800000,
    explanation:
      "土地を取得したので借方は土地。まだ支払っていないので貸方は未払金。",
    optionSetKey: "asset",
  },
  {
    text: "備品90,000円を購入し、代金は現金で支払った。",
    debit: "備品",
    debitAmount: 90000,
    credit: "現金",
    creditAmount: 90000,
    explanation:
      "備品の購入なので借方は備品。現金支払いなので貸方は現金。",
    optionSetKey: "asset",
  },
  {
    text: "車両運搬具450,000円を購入し、代金は普通預金から支払った。",
    debit: "車両運搬具",
    debitAmount: 450000,
    credit: "普通預金",
    creditAmount: 450000,
    explanation:
      "固定資産の取得なので借方は車両運搬具。普通預金から支払ったため貸方は普通預金。",
    optionSetKey: "asset",
  },
  {
    text: "建物250,000円を購入し、50,000円は現金で支払い、残額は翌月払いとした。",
    debit: "建物",
    debitAmount: 250000,
    credit: "現金",
    creditAmount: 50000,
    credit2: "未払金",
    creditAmount2: 200000,
    explanation:
      "建物を取得したので借方は建物。現金支払分と未払分に分けて貸方に記入する。",
    optionSetKey: "asset",
  },
  {
    text: "土地600,000円を購入し、代金は普通預金から支払った。",
    debit: "土地",
    debitAmount: 600000,
    credit: "普通預金",
    creditAmount: 600000,
    explanation:
      "土地の取得なので借方は土地、普通預金から支払っているので貸方は普通預金。",
    optionSetKey: "asset",
  },
  {
    text: "備品200,000円を購入し、80,000円を現金で支払い、残額は翌月払いとした。",
    debit: "備品",
    debitAmount: 200000,
    credit: "現金",
    creditAmount: 80000,
    credit2: "未払金",
    creditAmount2: 120000,
    explanation:
      "備品取得なので借方は備品。現金支払分と未払分に分けて貸方に記入する。",
    optionSetKey: "asset",
  },
  {
    text: "車両運搬具120,000円を購入し、代金は翌月払いとした。",
    debit: "車両運搬具",
    debitAmount: 120000,
    credit: "未払金",
    creditAmount: 120000,
    explanation:
      "車両運搬具を購入したが未払いなので貸方は未払金。",
    optionSetKey: "asset",
  },
];

const depreciationQuestions: Question[] = [
  {
    text: "建物について間接法により減価償却を行い、当期の減価償却費は40,000円であった。",
    debit: "減価償却費",
    debitAmount: 40000,
    credit: "建物減価償却累計額",
    creditAmount: 40000,
    explanation:
      "間接法なので、資産そのものを直接減らさず、貸方に建物減価償却累計額を計上する。借方は費用として減価償却費。",
    optionSetKey: "depreciation",
  },
  {
    text: "備品について間接法により減価償却を行い、当期の減価償却費は25,000円であった。",
    debit: "減価償却費",
    debitAmount: 25000,
    credit: "備品減価償却累計額",
    creditAmount: 25000,
    explanation:
      "間接法では貸方に備品減価償却累計額を計上する。借方は減価償却費。",
    optionSetKey: "depreciation",
  },
  {
    text: "車両運搬具について間接法により減価償却を行い、当期の減価償却費は30,000円であった。",
    debit: "減価償却費",
    debitAmount: 30000,
    credit: "車両運搬具減価償却累計額",
    creditAmount: 30000,
    explanation:
      "間接法なので、貸方に車両運搬具減価償却累計額を計上する。借方は減価償却費。",
    optionSetKey: "depreciation",
  },
  {
    text: "建物について間接法により減価償却を行い、当期の減価償却費は18,000円であった。",
    debit: "減価償却費",
    debitAmount: 18000,
    credit: "建物減価償却累計額",
    creditAmount: 18000,
    explanation:
      "間接法では貸方に建物減価償却累計額、借方に減価償却費を記入する。",
    optionSetKey: "depreciation",
  },
  {
    text: "備品について間接法により減価償却を行い、当期の減価償却費は12,000円であった。",
    debit: "減価償却費",
    debitAmount: 12000,
    credit: "備品減価償却累計額",
    creditAmount: 12000,
    explanation:
      "備品の間接法による減価償却なので、借方は減価償却費、貸方は備品減価償却累計額。",
    optionSetKey: "depreciation",
  },
  {
    text: "車両運搬具について間接法により減価償却を行い、当期の減価償却費は22,000円であった。",
    debit: "減価償却費",
    debitAmount: 22000,
    credit: "車両運搬具減価償却累計額",
    creditAmount: 22000,
    explanation:
      "間接法なので借方は減価償却費、貸方は車両運搬具減価償却累計額。",
    optionSetKey: "depreciation",
  },
  {
    text: "建物について間接法により減価償却を行い、当期の減価償却費は50,000円であった。",
    debit: "減価償却費",
    debitAmount: 50000,
    credit: "建物減価償却累計額",
    creditAmount: 50000,
    explanation:
      "建物の間接法による減価償却。借方は減価償却費、貸方は建物減価償却累計額。",
    optionSetKey: "depreciation",
  },
  {
    text: "備品について間接法により減価償却を行い、当期の減価償却費は9,000円であった。",
    debit: "減価償却費",
    debitAmount: 9000,
    credit: "備品減価償却累計額",
    creditAmount: 9000,
    explanation:
      "備品の減価償却を間接法で行うので、貸方は備品減価償却累計額。",
    optionSetKey: "depreciation",
  },
  {
    text: "車両運搬具について間接法により減価償却を行い、当期の減価償却費は16,000円であった。",
    debit: "減価償却費",
    debitAmount: 16000,
    credit: "車両運搬具減価償却累計額",
    creditAmount: 16000,
    explanation:
      "車両運搬具の減価償却なので借方は減価償却費、貸方は車両運搬具減価償却累計額。",
    optionSetKey: "depreciation",
  },
  {
    text: "建物について間接法により減価償却を行い、当期の減価償却費は27,000円であった。",
    debit: "減価償却費",
    debitAmount: 27000,
    credit: "建物減価償却累計額",
    creditAmount: 27000,
    explanation:
      "建物の減価償却。間接法なので貸方に建物減価償却累計額を計上する。",
    optionSetKey: "depreciation",
  },
];

export const questions: Question[] = [
  ...salesQuestions,
  ...purchaseQuestions,
  ...expenseQuestions,
  ...assetQuestions,
  ...depreciationQuestions,
];