import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Star, MapPin, IndianRupee, Book, Briefcase, ChevronLeft } from "lucide-react";
import Link from "next/link";
import CollegeChat from "./CollegeChat";

export default async function CollegeDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const college = await prisma.college.findUnique({
    where: { id },
    include: { courses: true, reviews: true }
  });

  if (!college) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/colleges" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Colleges
      </Link>
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <div className="h-64 sm:h-96 w-full bg-slate-200 relative">
          {college.imageUrl ? (
            <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image Available</div>
          )}
        </div>
        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {college.location}</span>
                <span className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4 fill-current mr-1" /> {college.rating.toFixed(1)} Rating
                </span>
                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {college.placement}% Placement</span>
              </div>
            </div>
            <button className="shrink-0 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition">
              Save College
            </button>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-6">
            {college.description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center"><Book className="w-6 h-6 mr-2 text-blue-600" /> Available Courses</h2>
            <div className="space-y-4">
              {college.courses.map((course) => (
                <div key={course.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{course.name}</h3>
                    <p className="text-slate-500 text-sm">{course.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white flex items-center justify-end"><IndianRupee className="w-4 h-4 mr-1" /> {course.fees.toLocaleString()}</p>
                    <p className="text-slate-500 text-sm">per year</p>
                  </div>
                </div>
              ))}
              {college.courses.length === 0 && <p className="text-slate-500">No courses listed.</p>}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-indigo-600" /> Placement Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Placement Rate</span>
                <span className="font-bold">{college.placement}%</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Avg. Package</span>
                <span className="font-bold flex items-center"><IndianRupee className="w-4 h-4" /> {college.averagePackage} LPA</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-slate-500">Highest Package</span>
                <span className="font-bold flex items-center"><IndianRupee className="w-4 h-4" /> {college.highestPackage} LPA</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* AI Query Section */}
      <CollegeChat collegeContext={JSON.stringify(college)} />
    </div>
  );
}
