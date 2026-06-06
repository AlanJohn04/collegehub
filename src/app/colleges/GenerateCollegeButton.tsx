"use client";

import { useState } from "react";
import { generateCollegeIfNotFound } from "@/app/actions/gemini";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function GenerateCollegeButton({ query }: { query: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!query) return;
    setLoading(true);
    const id = await generateCollegeIfNotFound(query);
    setLoading(false);
    if (id) {
      router.push(`/colleges/${id}`);
    } else {
      alert("Could not find or generate data for this college. Please try another name.");
    }
  };

  return (
    <button 
      onClick={handleGenerate}
      disabled={loading}
      className="mt-4 flex items-center justify-center mx-auto gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition"
    >
      <Sparkles className="w-5 h-5" />
      {loading ? "AI is researching..." : `Ask AI to Research "${query}"`}
    </button>
  );
}
