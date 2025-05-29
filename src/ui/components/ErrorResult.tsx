export const ErrorResult = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center w-full py-12 px-6">
    <div className="relative">
      {/* Error icon with animated glow */}
      <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full">
        <svg
          className="w-8 h-8 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      
      {/* Pulsing glow effect */}
      <div className="absolute inset-0 w-16 h-16 bg-red-500/20 rounded-full animate-ping" />
    </div>
    
    <div className="mt-6 text-center max-w-md">
      <h3 className="text-lg font-medium text-red-400 mb-2">Error Occurred</h3>
      <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
        {message}
      </p>
      
      <div className="mt-4 text-xs text-slate-500">
        Please try again or check your configuration
      </div>
    </div>
  </div>
);
