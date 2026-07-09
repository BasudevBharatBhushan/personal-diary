"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuestionField } from "@/components/reflect/QuestionField";
import { CompletedCard } from "@/components/reflect/CompletedCard";
import { useQuestions } from "@/hooks/useQuestions";
import { useDailyEntry } from "@/hooks/useDailyEntry";
import { getKolkataDateKey, type Answer } from "@b3os/core";

interface AnswerDraft {
  value: string | boolean | number | null;
  detail: string;
}

export default function ReflectPage() {
  const dateKey = getKolkataDateKey();
  const { questions, loading: qLoading } = useQuestions();
  const { entry, loading: eLoading, submitting, submit } = useDailyEntry(dateKey);

  const [answers, setAnswers] = useState<Record<string, AnswerDraft>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setValue = (questionId: string, value: string | boolean | number | null) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value, detail: prev[questionId]?.detail ?? "" },
    }));
  };

  const setDetail = (questionId: string, detail: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value: prev[questionId]?.value ?? null, detail },
    }));
  };

  const handleClose = async () => {
    setSubmitError(null);
    const payload: Answer[] = questions.map((question) => {
      const draft = answers[question.id];
      let value: string | boolean | number;
      if (question.type === "text") {
        value = typeof draft?.value === "string" ? draft.value : "";
      } else if (question.type === "yesno") {
        value = typeof draft?.value === "boolean" ? draft.value : false;
      } else {
        value = typeof draft?.value === "number" ? draft.value : 0;
      }
      return {
        questionId: question.id,
        prompt: question.prompt,
        type: question.type,
        value,
        detail: draft?.detail.trim() || null,
      };
    });

    try {
      await submit(payload);
    } catch {
      setSubmitError("Couldn't close today — try again 🙈");
    }
  };

  return (
    <PageShell>
      <PageHeader emoji="🌙" title="Day Close" subtitle="Gently close today ✨" accent="purple" />
      <div className="flex flex-col gap-4 sm:gap-5">
        <Link href="/reflect/manage" className="self-start">
          <Button accent="purple" variant="soft">
            ✏️ Manage questions
          </Button>
        </Link>

        {qLoading || eLoading ? (
          <p className="text-center text-stone-500">Loading your day… 🌙</p>
        ) : entry ? (
          <CompletedCard entry={entry} accent="purple" />
        ) : questions.length === 0 ? (
          <EmptyState accent="purple" message="No questions yet — add some from Manage questions ✏️" />
        ) : (
          <>
            {questions.map((question) => (
              <QuestionField
                key={question.id}
                question={question}
                value={answers[question.id]?.value ?? null}
                detail={answers[question.id]?.detail ?? ""}
                onValue={(value) => setValue(question.id, value)}
                onDetail={(detail) => setDetail(question.id, detail)}
                accent="purple"
              />
            ))}
            {submitError ? <p className="text-sm text-pink-600">{submitError}</p> : null}
            <Button accent="purple" disabled={submitting} onClick={handleClose}>
              {submitting ? "Closing…" : "✨ Close today"}
            </Button>
          </>
        )}
      </div>
    </PageShell>
  );
}
