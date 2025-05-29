export const LoadingResult = () => (
  <div className="flex flex-col items-center justify-center w-full py-12 px-6">
    <div className="relative">
      {/* Outer rotating ring */}
      <div className="w-12 h-12 rounded-full border-2 border-slate-600 border-t-blue-400 animate-spin" />
      
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 w-12 h-12 rounded-full bg-blue-400/20 animate-ping" />
    </div>
    
    <div className="mt-6 text-center">
      <h3 className="text-lg font-medium text-white mb-2">Generating Response</h3>
      <p className="text-sm text-slate-400">AI is thinking and crafting your response...</p>
      
      {/* Animated dots */}
      <div className="flex items-center justify-center space-x-1 mt-4">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);
