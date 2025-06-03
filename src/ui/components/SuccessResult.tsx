import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SuccessResult = ({ 
  result, 
  onSelectionChange 
}: { 
  result: string;
  onSelectionChange?: (selectedText: string) => void;
}) => {
  const [viewMode, setViewMode] = useState<'markdown' | 'raw'>('markdown');
  const contentRef = useRef<HTMLDivElement>(null);
  const lastSelectionRef = useRef<string>('');

  const checkSelection = useCallback(() => {
    if (viewMode === 'raw') return; // Raw mode uses onSelect event
    
    const selection = window.getSelection();
    const container = contentRef.current;
    
    if (!selection || !container || selection.rangeCount === 0) {
      if (lastSelectionRef.current !== '') {
        lastSelectionRef.current = '';
        onSelectionChange?.('');
      }
      return;
    }

    const selectedText = selection.toString().trim();
    if (!selectedText) {
      if (lastSelectionRef.current !== '') {
        lastSelectionRef.current = '';
        onSelectionChange?.('');
      }
      return;
    }

    // Check if selection is within our content container
    try {
      const range = selection.getRangeAt(0);
      const startContainer = range.startContainer;
      const endContainer = range.endContainer;
      
      // For both text nodes and element nodes, check if they're within our container
      const isStartInContainer = container.contains(
        startContainer.nodeType === Node.TEXT_NODE ? startContainer.parentNode : startContainer
      );
      const isEndInContainer = container.contains(
        endContainer.nodeType === Node.TEXT_NODE ? endContainer.parentNode : endContainer
      );
      
      if (isStartInContainer && isEndInContainer) {
        if (selectedText !== lastSelectionRef.current) {
          lastSelectionRef.current = selectedText;
          onSelectionChange?.(selectedText);
        }
      } else {
        if (lastSelectionRef.current !== '') {
          lastSelectionRef.current = '';
          onSelectionChange?.('');
        }
      }
    } catch (e) {
      // Fallback: if range operations fail, clear selection
      if (lastSelectionRef.current !== '') {
        lastSelectionRef.current = '';
        onSelectionChange?.('');
      }
    }
  }, [onSelectionChange, viewMode]);

  const handleTextAreaSelect = useCallback((e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).trim();
    if (selectedText !== lastSelectionRef.current) {
      lastSelectionRef.current = selectedText;
      onSelectionChange?.(selectedText);
    }
  }, [onSelectionChange]);

  // Use the native selectionchange event for preview mode
  useEffect(() => {
    if (viewMode === 'markdown') {
      document.addEventListener('selectionchange', checkSelection);
      return () => {
        document.removeEventListener('selectionchange', checkSelection);
      };
    }
    // 明确返回 undefined 以满足 TypeScript
    return undefined;
  }, [checkSelection, viewMode]);

  // Memoize ReactMarkdown components to prevent unnecessary re-renders
  const markdownComponents = useMemo(() => ({
    // 简化样式，避免干扰文本选择
    h1: ({ children, ...props }: any) => <h1 {...props} style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem', borderBottom: '1px solid #475569', paddingBottom: '0.5rem'}}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props} style={{fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem', marginTop: '1.5rem'}}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props} style={{fontSize: '1.125rem', fontWeight: '500', color: 'white', marginBottom: '0.5rem', marginTop: '1rem'}}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props} style={{color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: '1.6'}}>{children}</p>,
    code: ({ children, className, ...props }: any) => {
      const isInline = !className;
      if (isInline) {
        return <code {...props} style={{padding: '0.125rem 0.375rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#93c5fd', backgroundColor: '#1e293b', borderRadius: '0.25rem', border: '1px solid #475569'}}>{children}</code>;
      }
      return <code {...props} style={{display: 'block', padding: '0.75rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#cbd5e1', backgroundColor: '#1e293b', borderRadius: '0.25rem', border: '1px solid #475569', overflowX: 'auto'}}>{children}</code>;
    },
    pre: ({ children, ...props }: any) => <pre {...props} style={{marginBottom: '1rem', overflowX: 'auto'}}>{children}</pre>,
    ul: ({ children, ...props }: any) => <ul {...props} style={{listStyle: 'disc', listStylePosition: 'inside', color: '#cbd5e1', marginBottom: '0.75rem'}}>{children}</ul>,
    ol: ({ children, ...props }: any) => <ol {...props} style={{listStyle: 'decimal', listStylePosition: 'inside', color: '#cbd5e1', marginBottom: '0.75rem'}}>{children}</ol>,
    li: ({ children, ...props }: any) => <li {...props} style={{color: '#cbd5e1', marginBottom: '0.25rem'}}>{children}</li>,
    blockquote: ({ children, ...props }: any) => <blockquote {...props} style={{borderLeft: '4px solid #60a5fa', paddingLeft: '1rem', fontStyle: 'italic', color: '#d1d5db', margin: '1rem 0'}}>{children}</blockquote>,
    a: ({ children, href, ...props }: any) => <a {...props} href={href} style={{color: '#60a5fa', textDecoration: 'underline'}} target="_blank" rel="noopener noreferrer">{children}</a>,
    strong: ({ children, ...props }: any) => <strong {...props} style={{fontWeight: '600', color: 'white'}}>{children}</strong>,
    em: ({ children, ...props }: any) => <em {...props} style={{fontStyle: 'italic', color: '#d1d5db'}}>{children}</em>,
    table: ({ children, ...props }: any) => <table {...props} style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #475569', marginBottom: '1rem'}}>{children}</table>,
    th: ({ children, ...props }: any) => <th {...props} style={{border: '1px solid #475569', padding: '0.5rem 0.75rem', backgroundColor: '#1e293b', fontWeight: '500', color: 'white'}}>{children}</th>,
    td: ({ children, ...props }: any) => <td {...props} style={{border: '1px solid #475569', padding: '0.5rem 0.75rem', color: '#cbd5e1'}}>{children}</td>,
  }), []);

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
      
      <div 
        ref={contentRef}
        style={{ 
          userSelect: 'text', 
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          msUserSelect: 'text',
          cursor: 'text'
        }}
      >
        {viewMode === 'markdown' ? (
          <div className="w-full pt-12 min-h-[300px] text-sm text-white bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <div 
              className="p-6 max-w-none text-left" 
              data-markdown-content
              style={{ 
                userSelect: 'text', 
                WebkitUserSelect: 'text',
                MozUserSelect: 'text',
                msUserSelect: 'text'
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
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
            onSelect={handleTextAreaSelect}
            className="w-full p-6 pt-12 text-sm font-mono text-white bg-slate-900/50 border border-slate-700/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 text-left"
            style={{
              minHeight: '300px',
              lineHeight: '1.6'
            }}
          />
        )}
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-lg" />
    </div>
  );
};
