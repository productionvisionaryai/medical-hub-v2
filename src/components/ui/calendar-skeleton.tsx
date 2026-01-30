export default function CalendarSkeleton() {
  return (
    <div className="w-full p-5 bg-white border-t border-slate-100 rounded-t-[2.5rem] animate-pulse">
      <div className="flex justify-between mb-5">
        <div className="h-5 w-32 bg-slate-200 rounded-md"></div>
        <div className="h-5 w-20 bg-slate-100 rounded-full"></div>
      </div>
      <div className="h-48 w-full bg-slate-50 rounded-2xl border border-slate-100 flex flex-col p-5 gap-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
          <div className="space-y-2 mt-2">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-3 w-32 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="h-12 w-full bg-slate-200 rounded-xl mt-auto"></div>
      </div>
    </div>
  );
}
