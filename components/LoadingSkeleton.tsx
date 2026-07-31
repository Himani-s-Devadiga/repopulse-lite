export default function LoadingSkeleton() {
  return (
    <div className="mt-10 animate-pulse space-y-6">
      <div className="h-10 w-1/2 bg-slate-800 rounded"></div>

      <div className="grid md:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="h-64 bg-slate-900 border border-slate-800 rounded-xl"></div>

      <div className="h-48 bg-slate-900 border border-slate-800 rounded-xl"></div>
    </div>
  );
}