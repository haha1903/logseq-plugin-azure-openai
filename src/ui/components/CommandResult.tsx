import { PropsWithChildren, ReactElement } from "react";

interface CommandResultProps {
  toolbar: ReactElement;
}

export const CommandResult = ({
  children,
  toolbar,
}: PropsWithChildren<CommandResultProps>) => {
  return (
    <div className="relative">
      <div className="w-full border border-slate-700/50 rounded-lg bg-slate-800/30 backdrop-blur-sm overflow-hidden">
        {/* Content Area */}
        <div className="p-4 bg-slate-800/20">
          {children}
        </div>
        
        {/* Toolbar */}
        <div className="border-t border-slate-700/50 bg-slate-800/40">
          {toolbar}
        </div>
      </div>
      
      {/* Subtle shadow for depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-slate-900/20 rounded-lg transform translate-y-1" />
    </div>
  );
};
