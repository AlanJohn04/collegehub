"use client";

import { useState } from "react";
import { predictColleges } from "@/app/actions/gemini";
import { Target, MapPin, IndianRupee } from "lucide-react";
import Link from "next/link";

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    setLoading(true);
    const data = await predictColleges(exam, rank);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">AI College Predictor</h1>
        <p className="text-slate-500">Enter your competitive exam rank, and Gemini will recommend the best colleges for you based on real-world data patterns.</p>
      </div>

      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm mb-12">
        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Select Exam</label>
            <select 
              value={exam} 
              onChange={(e) => setExam(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="NEET">NEET</option>
              <option value="CAT">CAT</option>
              <option value="CUET">CUET</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Rank or Percentile</label>
            <input 
              type="text" 
              required
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition">
            {loading ? "AI is Analyzing Data..." : "Predict Colleges"}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">AI Recommended Colleges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((c, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{c.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center mb-4"><MapPin className="w-4 h-4 mr-1"/> {c.location}</p>
                  
                  <div className="mt-auto space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Est. Fees</span>
                      <span className="font-medium flex items-center"><IndianRupee className="w-3 h-3"/> {c.fees?.toLocaleString() || "N/A"}/yr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Avg Package</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{c.averagePackage} LPA</span>
                    </div>
                  </div>
                </div>
                <Link href={`/colleges?q=${encodeURIComponent(c.name)}`} className="w-full py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-sm font-semibold text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  Search This College
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
