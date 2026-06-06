import { prisma } from "@/lib/db";
import { MessageSquare } from "lucide-react";
import CreateQuestionForm from "./CreateQuestionForm";

export default async function DiscussionsPage() {
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: 'desc' },
    include: { answers: true }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            Community Discussions
          </h1>
          <p className="text-slate-500 mt-2">Ask questions, share experiences, and help others.</p>
        </div>
      </div>

      <CreateQuestionForm />

      <div className="space-y-4 mt-8">
        {questions.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
            <p className="text-slate-500">No discussions yet. Be the first to ask a question!</p>
          </div>
        )}
        {questions.map(q => (
          <div key={q.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-2">{q.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-wrap">{q.body}</p>
            <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
              <span className="font-medium text-slate-700 dark:text-slate-300">Posted by: {q.authorName}</span>
              <span>{q.answers.length} answers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
