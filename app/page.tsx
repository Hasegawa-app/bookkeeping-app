"use client";

import { useEffect, useMemo, useState } from "react";
import { optionSets, questions } from "./questions";
import type { AnswerLine, Question } from "./types";

const QUESTION_COUNT = 10;

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
    .sort((a, b) => a.account.localeCompare(b.account));

  const normalizedCorrect = correctLines
    .map((line) => ({
      account: normalizeText(line.account),
      amount: line.amount,
    }))
    .sort((a, b) => a.account.localeCompare(b.account));

  return normalizedUser.every(
    (line, i) =>
      line.account === normalizedCorrect[i].account &&
      line.amount === normalizedCorrect[i].amount
  );
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

  const [debitLines, setDebitLines] = useState(makeInitialLines());
  const [creditLines, setCreditLines] = useState(makeInitialLines());

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // 初回ロード
  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled.slice(0, QUESTION_COUNT));
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];

  const accountOptions = useMemo(() => {
    if (!currentQuestion) return [];

    const all = optionSets[currentQuestion.optionSetKey];

    const correct = [
      currentQuestion.debit,
      currentQuestion.debit2,
      currentQuestion.credit,
      currentQuestion.credit2,
    ].filter((v): v is string => Boolean(v));

    const unique = Array.from(new Set(correct));

    const dummy = shuffleArray(
      all.filter((a) => !unique.includes(a))
    ).slice(0, 4);

    return shuffleArray([...unique, ...dummy]);
  }, [currentQuestion]);

  const correctDebit = buildCorrectLines(
    currentQuestion?.debit,
    currentQuestion?.debitAmount,
    currentQuestion?.debit2,
    currentQuestion?.debitAmount2
  );

  const correctCredit = buildCorrectLines(
    currentQuestion?.credit,
    currentQuestion?.creditAmount,
    currentQuestion?.credit2,
    currentQuestion?.creditAmount2
  );

  const handleCheck = () => {
    const ok =
      compareLinesUnordered(debitLines, correctDebit) &&
      compareLinesUnordered(creditLines, correctCredit);

    setIsCorrect(ok);
    setIsAnswered(true);
    if (ok) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setDebitLines(makeInitialLines());
    setCreditLines(makeInitialLines());
    setIsAnswered(false);
  };

  // ★ここが今回の本題
  const handleRestart = () => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled.slice(0, QUESTION_COUNT));

    setCurrentIndex(0);
    setScore(0);
    setDebitLines(makeInitialLines());
    setCreditLines(makeInitialLines());
    setIsAnswered(false);
    setIsCorrect(false);
  };

  if (!currentQuestion) return <div>Loading...</div>;

  if (currentIndex >= shuffledQuestions.length) {
    return (
      <div>
        <h2>結果</h2>
        <p>
          {score} / {shuffledQuestions.length}
        </p>
        <button onClick={handleRestart}>もう一回挑戦</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{currentQuestion.text}</h2>

      <button onClick={handleCheck}>解答</button>

      {isAnswered && (
        <>
          <p>{isCorrect ? "正解" : "不正解"}</p>
          <p>{currentQuestion.explanation}</p>
          <button onClick={handleNext}>次へ</button>
        </>
      )}
    </div>
  );
}