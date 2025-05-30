import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SuccessResult = ({ result }: { result: string }) => {
  const [viewMode, setViewMode] = useState<'markdown' | 'raw'>('markdown');

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center space-x-2">
          <div className="flex border border-slate-600/50 rounded-lg overflow-hidden bg-slate-800/50">
            <button
              onClick={() => setViewMode('markdown')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'markdown'
                  ? 'text-blue-400 bg-blue-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'raw'
                  ? 'text-blue-400 bg-blue-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Raw
            </button>
          </div>
          <div className="px-2 py-1 text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
            ✓ Generated
          </div>
        </div>
      </div>
      
      {viewMode === 'markdown' ? (
        <div className="w-full pt-12 min-h-[300px] text-sm text-white bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <div className="p-6 prose prose-invert prose-sm max-w-none text-left">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // 自定义组件样式
                h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4 border-b border-slate-600 pb-2 text-left">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-semibold text-white mb-3 mt-6 text-left">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-medium text-white mb-2 mt-4 text-left">{children}</h3>,
                p: ({ children }) => <p className="text-slate-200 mb-3 leading-relaxed text-left">{children}</p>,
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return <code className="px-1.5 py-0.5 text-xs font-mono text-blue-300 bg-slate-800 rounded border border-slate-700">{children}</code>;
                  }
                  return <code className="block p-3 text-xs font-mono text-slate-200 bg-slate-800 rounded border border-slate-700 overflow-x-auto text-left">{children}</code>;
                },
                pre: ({ children }) => <pre className="mb-4 overflow-x-auto text-left">{children}</pre>,
                ul: ({ children }) => <ul className="list-disc list-inside text-slate-200 mb-3 space-y-1 text-left">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-slate-200 mb-3 space-y-1 text-left">{children}</ol>,
                li: ({ children }) => <li className="text-slate-200 text-left">{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-slate-300 my-4 text-left">{children}</blockquote>,
                a: ({ children, href }) => <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
                table: ({ children }) => <table className="w-full border-collapse border border-slate-700 mb-4 text-left">{children}</table>,
                th: ({ children }) => <th className="border border-slate-700 px-3 py-2 bg-slate-800 text-left font-medium text-white">{children}</th>,
                td: ({ children }) => <td className="border border-slate-700 px-3 py-2 text-slate-200 text-left">{children}</td>,
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <textarea
          rows={12}
          value={result}
          readOnly
          className="w-full p-6 pt-12 text-sm font-mono text-white bg-slate-900/50 border border-slate-700/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 text-left"
          style={{
            minHeight: '300px',
            lineHeight: '1.6'
          }}
        />
      )}
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-lg" />
    </div>
  );
};
