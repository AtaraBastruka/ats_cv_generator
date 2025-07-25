// app/create/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="h-10 bg-white/10 rounded-lg w-64 mx-auto mb-2 animate-pulse"></div>
            <div className="h-6 bg-white/5 rounded-lg w-96 mx-auto animate-pulse"></div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-white/10 rounded-lg w-48 ml-auto animate-pulse"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="h-8 bg-white/10 rounded-lg w-48 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="h-8 bg-white/10 rounded-lg w-48 mb-6 animate-pulse"></div>
              <div className="h-96 bg-white/5 rounded-lg border border-white/10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}