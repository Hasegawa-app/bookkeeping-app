"use client";

import { useState } from "react";

type OptionSetKey = "sales" | "purchase" | "expense" | "asset" | "depreciation";

type Question = {
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

const optionSets: Record<OptionSetKey, string[]> = {
  sales: ["現金", "普通預金", "売掛金", "受取手形", "売上", "未収金"],
  purchase: ["現金", "普通預金", "買掛金", "支払手形", "仕入", "未払金"],
  expense: ["現金", "普通預金", "未払金", "通信費", "水道光熱費", "旅費交通費"],
  asset: ["現金", "普通預金", "備品", "消耗品", "未収金", "未払金"],
  depreciation: ["減価償却費", "減価償却累計額", "備品", "現金", "未払金", "普通預金"],
};

const questions: Question[] = [
  {
    text: "商品30,000円を売り上げ、代金は現金で受け取った。",
    debit: "現金",
    debitAmount: 30000,
    credit: "売上",
    creditAmount: 30000,
    explanation:
      "商品を売ったので貸方は売上。代金を現金で受け取っているので借方は現金。",
    optionSetKey: "sales",
  },
  {
    text: "備品10,000円を現金で購入した。",
    debit: "備品",
    debitAmount: 10000,
    credit: "現金",
    creditAmount: 10000,
    explanation:
      "備品が増えるので借方は備品。現金が減るので貸方は現金。",
    optionSetKey: "asset",
  },
  {
    text: "商品20,000円を仕入れ、代金は掛けとした。",
    debit: "仕入",
    debitAmount: 20000,
    credit: "買掛金",
    creditAmount: 20000,
    explanation:
      "商品を仕入れたので借方は仕入。後払いなので貸方は買掛金。",
    optionSetKey: "purchase",
  },
  {
    text: "掛けで仕入れていた商品15,000円分の代金を現金で支払った。",
    debit: "買掛金",
    debitAmount: 15000,
    credit: "現金",
    creditAmount: 15000,
    explanation:
      "買掛金が減るので借方は買掛金。現金が減るので貸方は現金。",
    optionSetKey: "purchase",
  },
  {
    text: "商品25,000円を売り上げ、代金は掛けとした。",
    debit: "売掛金",
    debitAmount: 25000,
    credit: "売上",
    creditAmount: 25000,
    explanation:
      "商品を売ったので貸方は売上。後で受け取るので借方は売掛金。",
    optionSetKey: "sales",
  },
  {
    text: "掛けで売り上げていた商品25,000円分の代金を現金で受け取った。",
    debit: "現金",
    debitAmount: 25000,
    credit: "売掛金",
    creditAmount: 25000,
    explanation:
      "現金が増えるので借方は現金。売掛金が減るので貸方は売掛金。",
    optionSetKey: "sales",
  },
  {
    text: "通信費3,000円を現金で支払った。",
    debit: "通信費",
    debitAmount: 3000,
    credit: "現金",
    creditAmount: 3000,
    explanation:
      "通信費が発生したので借方は通信費。現金が減るので貸方は現金。",
    optionSetKey: "expense",
  },
  {
    text: "水道光熱費5,000円を未払いとした。",
    debit: "水道光熱費",
    debitAmount: 5000,
    credit: "未払金",
    creditAmount: 5000,
    explanation:
      "水道光熱費が発生しているので借方は水道光熱費。まだ支払っていないので貸方は未払金。",
    optionSetKey: "expense",
  },
  {
    text: "商品12,000円を売り上げ、7,000円は現金で受け取り、残りは掛けとした。",
    debit: "現金",
    debitAmount: 7000,
    debit2: "売掛金",
    debitAmount2: 5000,
    credit: "売上",
    creditAmount: 12000,
    explanation:
      "売上が発生しているので貸方は売上。代金の一部を現金で受け取り、残りは後で受け取るため、借方は現金と売掛金の2つになる。",
    optionSetKey: "sales",
  },
  {
    text: "商品18,000円を仕入れ、8,000円は現金で支払い、残額は掛けとした。",
    debit: "仕入",
    debitAmount: 18000,
    credit: "現金",
    creditAmount: 8000,
    credit2: "買掛金",
    creditAmount2: 10000,
    explanation:
      "商品を仕入れたので借方は仕入。支払方法が現金と後払いに分かれるため、貸方は現金と買掛金の2つになる。",
    optionSetKey: "purchase",
  },
  {
    text: "備品の減価償却費として5,000円を間接法で計上した。",
    debit: "減価償却費",
    debitAmount: 5000,
    credit: "減価償却累計額",
    creditAmount: 5000,
    explanation:
      "減価償却費は費用なので借方。資産の価値減少は間接法なので減価償却累計額として貸方に計上する。",
    optionSetKey: "depreciation",
  },
];

function formatNumber(value: string) {
  const digits = value.replace(/,/g, "").replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("ja-JP");
}

function parseNumber(value: string) {
  const digits = value.replace(/,/g, "").replace(/[^\d]/g, "");
  return digits === "" ? null : Number(digits);
}

function formatAmount(amount?: number) {
  if (amount === undefined) return "";
  return amount.toLocaleString("ja-JP");
}

export default function Page() {
  const [index, setIndex] = useState(0);

  const [debit, setDebit] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [debit2, setDebit2] = useState("");
  const [debitAmount2, setDebitAmount2] = useState("");

  const [credit, setCredit] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [credit2, setCredit2] = useState("");
  const [creditAmount2, setCreditAmount2] = useState("");

  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const accountOptions = optionSets[q.optionSetKey];
  const isLastQuestion = index === questions.length - 1;

  const normalizeText = (value: string) => value.trim();

  const sameEntries = (
  userEntries: Array<{ account: string; amount: number }>,
  correctEntries: Array<{ account: string; amount: number }>
  ) => {
  if (userEntries.length !== correctEntries.length) return false;

  const normalize = (entries: Array<{ account: string; amount: number }>) =>
    entries
      .map((entry) => ({
        account: entry.account,
        amount: entry.amount,
      }))
      .sort((a, b) => {
        const accountCompare = a.account.localeCompare(b.account, "ja");
        if (accountCompare !== 0) return accountCompare;
        return a.amount - b.amount;
      });

  const normalizedUser = normalize(userEntries);
  const normalizedCorrect = normalize(correctEntries);

  return normalizedUser.every(
    (entry, i) =>
      entry.account === normalizedCorrect[i].account &&
      entry.amount === normalizedCorrect[i].amount
  );
};
const checkAnswer = () => {
  if (answered) return;

  const userDebits = [
    {
      account: normalizeText(debit),
      amount: parseNumber(debitAmount),
    },
    ...(normalizeText(debit2) && parseNumber(debitAmount2) !== null
      ? [
          {
            account: normalizeText(debit2),
            amount: parseNumber(debitAmount2) as number,
          },
        ]
      : []),
  ].filter((entry) => entry.account && entry.amount !== null) as Array<{
    account: string;
    amount: number;
  }>;

  const userCredits = [
    {
      account: normalizeText(credit),
      amount: parseNumber(creditAmount),
    },
    ...(normalizeText(credit2) && parseNumber(creditAmount2) !== null
      ? [
          {
            account: normalizeText(credit2),
            amount: parseNumber(creditAmount2) as number,
          },
        ]
      : []),
  ].filter((entry) => entry.account && entry.amount !== null) as Array<{
    account: string;
    amount: number;
  }>;

  const correctDebits = [
    {
      account: q.debit,
      amount: q.debitAmount,
    },
    ...(q.debit2 && q.debitAmount2 !== undefined
      ? [
          {
            account: q.debit2,
            amount: q.debitAmount2,
          },
        ]
      : []),
  ];

  const correctCredits = [
    {
      account: q.credit,
      amount: q.creditAmount,
    },
    ...(q.credit2 && q.creditAmount2 !== undefined
      ? [
          {
            account: q.credit2,
            amount: q.creditAmount2,
          },
        ]
      : []),
  ];

  const isCorrect =
    sameEntries(userDebits, correctDebits) &&
    sameEntries(userCredits, correctCredits);

  setResult(isCorrect ? "correct" : "wrong");
  setAnswered(true);

  if (isCorrect) {
    setScore((prev) => prev + 1);
  }
};

  const nextQuestion = () => {
    if (!answered) return;

    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    setIndex((prev) => prev + 1);
    setDebit("");
    setDebitAmount("");
    setDebit2("");
    setDebitAmount2("");
    setCredit("");
    setCreditAmount("");
    setCredit2("");
    setCreditAmount2("");
    setResult(null);
    setAnswered(false);
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setDebit("");
    setDebitAmount("");
    setDebit2("");
    setDebitAmount2("");
    setCredit("");
    setCreditAmount("");
    setCredit2("");
    setCreditAmount2("");
    setResult(null);
    setAnswered(false);
    setFinished(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: 8,
    boxSizing: "border-box",
  };

  const boxStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 220,
    border: "1px solid #ddd",
    padding: 12,
    borderRadius: 10,
    background: "#fafafa",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 12px",
    fontSize: "16px",
    fontWeight: 700,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  };

  const renderCorrectAnswer = () => {
    const debitParts = [`${q.debit} ${formatAmount(q.debitAmount)}`];
    if (q.debit2 && q.debitAmount2 !== undefined) {
      debitParts.push(`${q.debit2} ${formatAmount(q.debitAmount2)}`);
    }

    const creditParts = [`${q.credit} ${formatAmount(q.creditAmount)}`];
    if (q.credit2 && q.creditAmount2 !== undefined) {
      creditParts.push(`${q.credit2} ${formatAmount(q.creditAmount2)}`);
    }

    return `借方：${debitParts.join(" ／ ")}　|　貸方：${creditParts.join(" ／ ")}`;
  };

  if (finished) {
    return (
      <div
        style={{
          padding: 16,
          maxWidth: 700,
          margin: "0 auto",
          fontFamily: "sans-serif",
          lineHeight: 1.5,
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>結果</h1>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 20,
            background: "#fff",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            {score} / {questions.length} 問正解
          </div>
          <div style={{ fontSize: 16, color: "#555" }}>
            正答率：{Math.round((score / questions.length) * 100)}%
          </div>
        </div>

        <button
          onClick={resetQuiz}
          style={{
            ...buttonStyle,
            background: "#0b6bcb",
            color: "#fff",
            fontSize: "20px",
            padding: "18px 12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          もう一度最初から
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 16,
        maxWidth: 700,
        margin: "0 auto",
        fontFamily: "sans-serif",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>仕訳マスター</h1>

      <div style={{ marginBottom: 8, fontSize: 15, color: "#555" }}>
        第 {index + 1} 問 / {questions.length} 問
      </div>

      <div style={{ marginBottom: 16, fontSize: 15, color: "#555" }}>
        現在の正答数：{score}
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 14,
          background: "#fff",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
          問題
        </div>
        <div style={{ fontSize: 17 }}>{q.text}</div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <div style={boxStyle}>
          <h3 style={{ marginTop: 0 }}>借方</h3>

          <select
            value={debit}
            onChange={(e) => setDebit(e.target.value)}
            style={{ ...inputStyle, marginBottom: 8 }}
            disabled={answered}
          >
            <option value="">科目を選択</option>
            {accountOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="金額"
            value={debitAmount}
            onChange={(e) => setDebitAmount(formatNumber(e.target.value))}
            style={{ ...inputStyle, marginBottom: 12 }}
            disabled={answered}
          />

          <select
            value={debit2}
            onChange={(e) => setDebit2(e.target.value)}
            style={{ ...inputStyle, marginBottom: 8 }}
            disabled={answered}
          >
            <option value="">2つ目の科目（なければ空欄）</option>
            {accountOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="2つ目の金額"
            value={debitAmount2}
            onChange={(e) => setDebitAmount2(formatNumber(e.target.value))}
            style={inputStyle}
            disabled={answered}
          />
        </div>

        <div style={boxStyle}>
          <h3 style={{ marginTop: 0 }}>貸方</h3>

          <select
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            style={{ ...inputStyle, marginBottom: 8 }}
            disabled={answered}
          >
            <option value="">科目を選択</option>
            {accountOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="金額"
            value={creditAmount}
            onChange={(e) => setCreditAmount(formatNumber(e.target.value))}
            style={{ ...inputStyle, marginBottom: 12 }}
            disabled={answered}
          />

          <select
            value={credit2}
            onChange={(e) => setCredit2(e.target.value)}
            style={{ ...inputStyle, marginBottom: 8 }}
            disabled={answered}
          >
            <option value="">2つ目の科目（なければ空欄）</option>
            {accountOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="2つ目の金額"
            value={creditAmount2}
            onChange={(e) => setCreditAmount2(formatNumber(e.target.value))}
            style={inputStyle}
            disabled={answered}
          />
        </div>
      </div>

      {!answered && (
        <button
          onClick={checkAnswer}
          style={{
            ...buttonStyle,
            background: "#222",
            color: "#fff",
            marginBottom: 12,
          }}
        >
          解答する
        </button>
      )}

      {answered && result && (
        <div
          style={{
            marginBottom: 14,
            padding: 14,
            borderRadius: 10,
            background: result === "correct" ? "#e8f7e8" : "#fff3f3",
            border: `1px solid ${result === "correct" ? "#8bc48b" : "#e0a0a0"}`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 8,
              color: result === "correct" ? "#1d6b1d" : "#a33",
            }}
          >
            {result === "correct" ? "正解！" : "不正解"}
          </div>

          <div style={{ fontSize: 16, marginBottom: 8 }}>
            正解：{renderCorrectAnswer()}
          </div>

          <div style={{ fontSize: 15, color: "#333" }}>
            解説：{q.explanation}
          </div>
        </div>
      )}

      {answered && (
        <button
          onClick={nextQuestion}
          style={{
            ...buttonStyle,
            background: "#0b6bcb",
            color: "#fff",
            fontSize: "20px",
            padding: "18px 12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {isLastQuestion ? "結果を見る" : "次の問題へ"}
        </button>
      )}
    </div>
  );
}