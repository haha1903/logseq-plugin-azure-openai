import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import "../style.css";
import { Command } from "../LogseqAI";

const CommandOption = ({ command }: { command: Command }) => {
  const getIcon = (type: string) => {
    if (type === "custom") {
      return (
        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  };

  if (command.type === "custom") {
    return (
      <div className="flex items-center space-x-3 w-full">
        <div className="flex-shrink-0">
          {getIcon(command.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">
              Custom
            </span>
            <span className="text-sm font-medium text-white truncate">{command.name}</span>
          </div>
          {command.shortcut && (
            <div className="text-xs text-slate-400 mt-1">
              {command.shortcut}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-3 w-full">
        <div className="flex-shrink-0">
          {getIcon(command.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">{command.name}</div>
          {command.shortcut && (
            <div className="text-xs text-slate-400 mt-1">
              {command.shortcut}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export const CommandOptions = ({ commands }: { commands: Command[] }) => (
  <div className="space-y-1">
    {commands.map((command: any, idx: any) => (
      <Combobox.Option key={idx} value={command}>
        {({ active }) => (
          <div
            className={clsx(
              "group relative rounded-lg px-3 py-3 cursor-pointer transition-all duration-150",
              "border border-transparent",
              active ? [
                "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
                "border-blue-500/20",
                "shadow-lg shadow-blue-500/10"
              ] : [
                "hover:bg-slate-700/30",
                "hover:border-slate-600/30"
              ]
            )}
          >
            <CommandOption command={command} />
            
            {/* Subtle glow effect on hover */}
            <div className={clsx(
              "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-150",
              "bg-gradient-to-r from-blue-400/5 to-purple-400/5",
              active && "opacity-100"
            )} />
          </div>
        )}
      </Combobox.Option>
    ))}
  </div>
);
