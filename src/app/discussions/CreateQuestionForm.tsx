"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createQuestion } from "@/app/actions/discussions";
import { useRouter } from "next/navigation";

export default function CreateQuestionForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-center font-medium">
        Please sign in to start a new discussion.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createQuestion(title, body, user.uid, user.email || "Anonymous");
    setTitle("");
    setBody("");
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <h3 className="font-bold text-lg">Start a New Discussion</h3>
      <input 
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Question Title (e.g. Which college is better for CS?)"
        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
      />
      <textarea 
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Explain your question in detail..."
        rows={4}
        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition disabled:opacity-50">
          Post Question
        </button>
      </div>
    </form>
  );
}
