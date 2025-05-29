export const SuccessResult = ({ result }: { result: string }) => (
  <div className="relative">
    <div className="absolute top-4 right-4 z-10">
      <div className="flex items-center space-x-2">
        <div className="px-2 py-1 text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
          ✓ Generated
        </div>
      </div>
    </div>
    
    <textarea
      rows={12}
      value={result}
      readOnly
      className="w-full p-4 pt-6 text-sm font-mono text-white bg-slate-900/50 border border-slate-700/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
      style={{
        minHeight: '300px',
        lineHeight: '1.6'
      }}
    />
    
    {/* Subtle gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-lg" />
  </div>
);
