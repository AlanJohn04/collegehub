"use client";

import { useState } from "react";
import { X, Search, Check, TrendingUp, IndianRupee, MapPin, Star } from "lucide-react";
import Link from "next/link";

type CollegeLite = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement: number;
  averagePackage: number;
  highestPackage: number;
  imageUrl: string | null;
};

export default function CompareClient({ colleges }: { colleges: CollegeLite[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const selectedColleges = colleges.filter(c => selectedIds.includes(c.id));
  const filteredColleges = colleges.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleCollege = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Compare Colleges</h1>
        <p className="text-slate-500">Select up to 3 colleges to compare their placements, fees, and ratings.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Selection sidebar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit shadow-sm">
          <h3 className="font-semibold mb-4">Add Colleges ({selectedIds.length}/3)</h3>
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {filteredColleges.map(c => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <button 
                  key={c.id} 
                  onClick={() => toggleCollege(c.id)}
                  className={`w-full text-left flex items-start gap-2 p-3 rounded-xl border transition-colors ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`}
                >
                  <div className={`mt-0.5 flex-none w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight mb-1">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.location}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Area */}
        <div className="lg:col-span-3">
          {selectedColleges.length === 0 ? (
            <div className="h-96 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500">
              <TrendingUp className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-700" />
              <p>Select at least 1 college from the sidebar to start comparing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedColleges.map(college => (
                <div key={college.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm relative">
                  <button onClick={() => toggleCollege(college.id)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 backdrop-blur-sm transition">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="h-40 bg-slate-200 relative">
                    {college.imageUrl && <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-1 leading-tight h-14 line-clamp-2">{college.name}</h2>
                    <p className="text-sm text-slate-500 mb-6 flex items-center"><MapPin className="w-3 h-3 mr-1"/> {college.location}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Rating</p>
                        <div className="flex items-center gap-1 font-semibold"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {college.rating.toFixed(1)} / 5.0</div>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Tuition Fees</p>
                        <div className="font-semibold flex items-center"><IndianRupee className="w-4 h-4 mr-0.5" /> {college.fees.toLocaleString()}/yr</div>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Average Package</p>
                        <div className="font-semibold text-green-600 dark:text-green-400 flex items-center"><IndianRupee className="w-4 h-4 mr-0.5" /> {college.averagePackage} LPA</div>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Highest Package</p>
                        <div className="font-semibold flex items-center"><IndianRupee className="w-4 h-4 mr-0.5" /> {college.highestPackage} LPA</div>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Placement Rate</p>
                        <div className="font-semibold">{college.placement}%</div>
                      </div>
                    </div>
                    <Link href={`/colleges/${college.id}`} className="mt-8 w-full py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-xl text-center block hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                      View Full Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
