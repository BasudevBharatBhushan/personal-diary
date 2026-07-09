"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/cn";
import { getAccentClasses } from "@/lib/accents";
import { useQuestions } from "@/hooks/useQuestions";
import type { QuestionType } from "@b3os/core";

const TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: "text", label: "📝 Text" },
  { value: "yesno", label: "👍 Yes/No" },
  { value: "scale", label: "😐 Scale" },
];

export default function ManageQuestionsPage() {
  const { questions, loading, create, update, remove, reorder } = useQuestions();

  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState<QuestionType>("text");
  const [emoji, setEmoji] = useState("");
  const [allowDetail, setAllowDetail] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState("");

  const { chip } = getAccentClasses("purple");

  const handleAdd = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    await create({ prompt: trimmed, type, emoji: emoji.trim() || null, allowDetail });
    setPrompt("");
    setType("text");
    setEmoji("");
    setAllowDetail(false);
  };

  const startEdit = (id: string, currentPrompt: string) => {
    setEditingId(id);
    setEditPrompt(currentPrompt);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditPrompt("");
  };

  const saveEdit = async (id: string) => {
    const trimmed = editPrompt.trim();
    if (!trimmed) return;
    await update(id, { prompt: trimmed });
    cancelEdit();
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const ids = questions.map((q) => q.id);
    const tmp = ids[index - 1]!;
    ids[index - 1] = ids[index]!;
    ids[index] = tmp;
    await reorder(ids);
  };

  const moveDown = async (index: number) => {
    if (index === questions.length - 1) return;
    const ids = questions.map((q) => q.id);
    const tmp = ids[index + 1]!;
    ids[index + 1] = ids[index]!;
    ids[index] = tmp;
    await reorder(ids);
  };

  return (
    <PageShell>
      <PageHeader
        emoji="✏️"
        title="Manage Questions"
        subtitle="Add, edit, reorder your nightly questions."
        accent="purple"
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <Link href="/reflect" className="self-start">
          <Button accent="purple" variant="soft">
            ← Back to Day Close
          </Button>
        </Link>

        <Card accent="purple" className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-stone-700">New question</label>
          <TextInput
            accent="purple"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="What do you want to ask yourself?"
          />
          <div className="flex flex-wrap gap-2">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                className={cn(
                  "flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-all",
                  type === option.value
                    ? cn(chip, "scale-105 shadow-md")
                    : "bg-stone-100 text-stone-500 opacity-60 hover:opacity-100",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-col gap-2 sm:w-32">
              <label className="text-xs font-semibold text-stone-500">emoji</label>
              <TextInput
                accent="purple"
                value={emoji}
                onChange={(event) => setEmoji(event.target.value)}
                placeholder="🌟"
              />
            </div>
            <Checkbox
              accent="purple"
              id="allow-detail"
              label="Allow a detail note"
              checked={allowDetail}
              onChange={(event) => setAllowDetail(event.target.checked)}
            />
          </div>
          <Button accent="purple" onClick={handleAdd}>
            ➕ Add question
          </Button>
        </Card>

        {loading ? (
          <p className="text-center text-stone-500">Loading questions… 🌙</p>
        ) : (
          <div className="flex flex-col gap-3">
            {questions.map((question, index) => (
              <Card key={question.id} accent="purple" className="flex flex-col gap-3">
                {editingId === question.id ? (
                  <div className="flex flex-col gap-3">
                    <TextInput
                      accent="purple"
                      value={editPrompt}
                      onChange={(event) => setEditPrompt(event.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button accent="purple" onClick={() => saveEdit(question.id)}>
                        Save
                      </Button>
                      <Button accent="purple" variant="soft" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span aria-hidden>{question.emoji}</span>
                        <span className="text-sm font-semibold text-stone-700">
                          {question.prompt}
                        </span>
                      </div>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", chip)}>
                        {TYPE_OPTIONS.find((o) => o.value === question.type)?.label ?? question.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        accent="purple"
                        variant="soft"
                        onClick={() => startEdit(question.id, question.prompt)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button accent="pink" variant="soft" onClick={() => remove(question.id)}>
                        🗑️
                      </Button>
                      <Button
                        accent="purple"
                        variant="soft"
                        disabled={index === 0}
                        onClick={() => moveUp(index)}
                      >
                        ↑
                      </Button>
                      <Button
                        accent="purple"
                        variant="soft"
                        disabled={index === questions.length - 1}
                        onClick={() => moveDown(index)}
                      >
                        ↓
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
