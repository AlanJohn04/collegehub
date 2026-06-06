import { prisma } from "@/lib/db";
import Link from "next/link";
import { Search, MapPin, Star, IndianRupee } from "lucide-react";
import GenerateCollegeButton from "./GenerateCollegeButton";

export default async function CollegesPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams?.q === 'string' ? searchParams.q : "";
  const location = typeof searchParams?.location === 'string' ? searchParams.location : "";

  const colleges = await prisma.college.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
      location: { contains: location, mode: "insensitive" },
    },
    include: {
      courses: true,
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Colleges</h1>
        <p className="text-slate-500 mt-2">Find the perfect college matching your criteria.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-none space-y-6">
          <form className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  name="q" 
                  defaultValue={query}
                  placeholder="e.g. IIT" 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input 
                type="text" 
                name="location" 
                defaultValue={location}
                placeholder="e.g. Mumbai" 
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Apply Filters
            </button>
          </form>
        </aside>

        <div className="flex-1 space-y-6">
          {colleges.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 mb-4">No colleges found in our database matching "{query}".</p>
              {query && <GenerateCollegeButton query={query} />}
            </div>
          ) : (
            colleges.map((college) => (
              <div key={college.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow">
                <div className="h-48 sm:h-auto sm:w-64 bg-slate-200 flex-none relative">
                  {college.imageUrl ? (
                    <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">
                      <Link href={`/colleges/${college.id}`} className="hover:text-blue-600 transition-colors">
                        {college.name}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm font-medium">
                      <Star className="w-4 h-4 fill-current" /> {college.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" /> {college.location}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                    {college.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      <IndianRupee className="w-4 h-4 mr-1 text-slate-400" />
                      {college.fees.toLocaleString()} / year
                    </div>
                    <Link href={`/colleges/${college.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
