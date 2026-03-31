"use client";

import { useEffect, useMemo, useState } from "react";
import { optionSets, questions } from "./questions";
import { AnswerLine, Question } from "./types";

function shuffleArray<T>(array: T[]): T[] {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, "").trim();
}

function parseAmount(value: string): number | null {
  const normalized = value.replace(/,/g, "").trim();
  if (normalized === "") return null;
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

function formatAmountInput(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("ja-JP");
}

function buildCorrectLines(
  account1?: string,
  amount1?: number,
  account2?: string,
  amount2?: number
) {
  const lines: { account: string; amount: number }[] = [];

  if (account1 && amount1 !== undefined) {
    lines.push({ account: account1, amount: amount1 });
  }

  if (account2 && amount2 !== undefined) {
    lines.push({ account: account2, amount: amount2 });
  }

  return lines;
}

function isLineFilled(line: AnswerLine) {
  return line.account.trim() !== "" || line.amount.trim() !== "";
}

function compareLinesUnordered(
  userLines: AnswerLine[],
  correctLines: { account: string; amount: number }[]
) {
  const filteredUserLines = userLines.filter(isLineFilled);

  if (filteredUserLines.length !== correctLines.length) return false;

  const normalizedUser = filteredUserLines
    .map((line) => ({
      account: normalizeText(line.account),
      amount: parseAmount(line.amount),
    }))
    .sort((a, b) => {
      if (a.account < b.account) return -1;
      if (a.account > b.account) return 1;
      return (a.amount ?? 0) - (b.amount ?? 0);
    });

  const normalizedCorrect = correctLines
    .map((line) => ({
      account: normalizeText(line.account),
      amount: line.amount,
    }))
    .sort((a, b) => {
      if (a.account < b.account) return -1;
      if (a.account > b.account) return 1;
      return a.amount - b.amount;
    });

  return normalizedUser.every((line, index) => {
    return (
      line.account === normalizedCorrect[index].account &&
      line.amount === normalizedCorrect[index].amount
    );
  });
}

function makeInitialLines(): [AnswerLine, AnswerLine] {
  return [
    { account: "", amount: "" },
    { account: "", amount: "" },
  ];
}

export default function Page() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [debitLines, setDebitLines] = useState<[AnswerLine, AnswerLine]>(
    makeInitialLines()
  );
  const [creditLines, setCreditLines] = useState<[AnswerLine, AnswerLine]>(
    makeInitialLines()
  );

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];

  const accountOptions = useMemo(() => {
    if (!currentQuestion) return [];

    const allOptions = optionSets[currentQuestion.optionSetKey];

    const correctAccounts = [
      currentQuestion.debit,
      currentQuestion.debit2,
      currentQuestion.credit,
      currentQuestion.credit2,
    ].filter((account): account is string => Boolean(account));

    const uniqueCorrectAccounts = Array.from(new Set(correctAccounts));

    const dummyCandidates = allOptions.filter(
      (account) => !uniqueCorrectAccounts.includes(account)
    );

    const shuffledDummies = shuffleArray(dummyCandidates);
    const selectedDummies = shuffledDummies.slice(0, 4);

    return shuffleArray([...uniqueCorrectAccounts, ...selectedDummies]);
  }, [currentQuestion]);

  if (!currentQuestion) {
    return (
      <main className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
        <div className="rounded-2xl bg-white p-6 shadow-md text-center">
          読み込み中...
        </div>
      </main>
    );
  }

  const correctDebitLines = buildCorrectLines(
    currentQuestion.debit,
    currentQuestion.debitAmount,
    currentQuestion.debit2,
    currentQuestion.debitAmount2
  );

  const correctCreditLines = buildCorrectLines(
    currentQuestion.credit,
    currentQuestion.creditAmount,
    currentQuestion.credit2,
    currentQuestion.creditAmount2
  );

  const totalQuestions = shuffledQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleLineChange = (
    side: "debit" | "credit",
    index: 0 | 1,
    key: "account" | "amount",
    value: string
  ) => {
    if (side === "debit") {
      const newLines: [AnswerLine, AnswerLine] = [...debitLines];
      newLines[index] = {
        ...newLines[index],
        [key]: key === "amount" ? formatAmountInput(value) : value,
      };
      setDebitLines(newLines);
    } else {
      const newLines: [AnswerLine, AnswerLine] = [...creditLines];
      newLines[index] = {
        ...newLines[index],
        [key]: key === "amount" ? formatAmountInput(value) : value,
      };
      setCreditLines(newLines);
    }
  };

  const handleCheckAnswer = () => {
    const debitOk = compareLinesUnordered(debitLines, correctDebitLines);
    const creditOk = compareLinesUnordered(creditLines, correctCreditLines);
    const result = debitOk && creditOk;

    setIsCorrect(result);
    setIsAnswered(true);

    if (result) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setDebitLines(makeInitialLines());
    setCreditLines(makeInitialLines());
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(questions));
    setCurrentIndex(0);
    setDebitLines(makeInitialLines());
    setCreditLines(makeInitialLines());
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
  };

  if (currentIndex >= totalQuestions) {
    const percentage =
      totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);

    return (
      <main className="min-h-screen bg-slate-100 p-4">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-6">結果画面</h1>

          <div className="rounded-2xl bg-slate-50 p-6 text-center border">
            <p className="text-lg mb-2">おつかれさま</p>
            <p className="text-3xl font-bold mb-2">
              {score} / {totalQuestions} 問正解
            </p>
            <p className="text-slate-600">正答率：{percentage}%</p>
          </div>

          <button
            onClick={handleRestart}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-4 text-lg font-bold text-white shadow hover:bg-blue-700 active:scale-[0.99]"
          >
            もう一度挑戦する
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 rounded-2xl bg-white p-4 shadow">
          <h1 className="text-2xl font-bold mb-2">簿記 仕訳練習アプリ</h1>
          <p className="text-sm text-slate-600">
            第{currentIndex + 1}問 / {totalQuestions}問
          </p>
        </div>

        <div className="mb-4 rounded-2xl bg-white p-5 shadow">
          <h2 className="mb-3 text-lg font-bold">問題</h2>
          <p className="leading-7">{currentQuestion.text}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-blue-700">借方</h2>

            {debitLines.map((line, index) => (
              <div
                key={`debit-${index}`}
                className="mb-4 rounded-2xl border border-slate-200 p-4"
              >
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  勘定科目 {index + 1}
                </label>
                <select
                  value={line.account}
                  onChange={(e) =>
                    handleLineChange(
                      "debit",
                      index as 0 | 1,
                      "account",
                      e.target.value
                    )
                  }
                  disabled={isAnswered}
                  className="mb-3 w-full rounded-xl border bg-white px-3 py-3 text-base outline-none focus:border-blue-500"
                >
                  <option value="">選択してください</option>
                  {accountOptions.map((option) => (
                    <option key={`debit-${index}-${option}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  金額 {index + 1}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={line.amount}
                  onChange={(e) =>
                    handleLineChange(
                      "debit",
                      index as 0 | 1,
                      "amount",
                      e.target.value
                    )
                  }
                  disabled={isAnswered}
                  className="w-full rounded-xl border px-3 py-3 text-base outline-none focus:border-blue-500"
                  placeholder="例：100,000"
                />
              </div>
            ))}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-rose-700">貸方</h2>

            {creditLines.map((line, index) => (
              <div
                key={`credit-${index}`}
                className="mb-4 rounded-2xl border border-slate-200 p-4"
              >
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  勘定科目 {index + 1}
                </label>
                <select
                  value={line.account}
                  onChange={(e) =>
                    handleLineChange(
                      "credit",
                      index as 0 | 1,
                      "account",
                      e.target.value
                    )
                  }
                  disabled={isAnswered}
                  className="mb-3 w-full rounded-xl border bg-white px-3 py-3 text-base outline-none focus:border-rose-500"
                >
                  <option value="">選択してください</option>
                  {accountOptions.map((option) => (
                    <option key={`credit-${index}-${option}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  金額 {index + 1}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={line.amount}
                  onChange={(e) =>
                    handleLineChange(
                      "credit",
                      index as 0 | 1,
                      "amount",
                      e.target.value
                    )
                  }
                  disabled={isAnswered}
                  className="w-full rounded-xl border px-3 py-3 text-base outline-none focus:border-rose-500"
                  placeholder="例：100,000"
                />
              </div>
            ))}
          </section>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-lg font-bold text-white shadow hover:bg-emerald-700 active:scale-[0.99]"
            >
              解答する
            </button>
          ) : (
            <>
              <div
                className={`rounded-2xl p-5 shadow ${
                  isCorrect
                    ? "bg-gradient-to-r from-yellow-200 via-emerald-200 to-sky-200 border-2 border-emerald-400"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <h3
                  className={`mb-2 text-xl font-bold ${
                    isCorrect ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {isCorrect ? "正解！" : "不正解"}
                </h3>

                <div className="mb-4 text-sm leading-7 text-slate-700">
                  <p className="font-semibold">正答</p>

                  <div className="mt-2 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="mb-2 font-bold text-blue-700">借方</p>
                      {correctDebitLines.map((line, idx) => (
                        <p key={idx}>
                          {line.account} / {line.amount.toLocaleString("ja-JP")}
                        </p>
                      ))}
                    </div>

                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="mb-2 font-bold text-rose-700">貸方</p>
                      {correctCreditLines.map((line, idx) => (
                        <p key={idx}>
                          {line.account} / {line.amount.toLocaleString("ja-JP")}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white/70 p-4 text-sm leading-7 text-slate-800">
                  <p className="mb-1 font-semibold">解説</p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full rounded-2xl bg-blue-600 px-4 py-4 text-lg font-bold text-white shadow hover:bg-blue-700 active:scale-[0.99]"
              >
                {isLastQuestion ? "結果を見る" : "次の問題へ"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}