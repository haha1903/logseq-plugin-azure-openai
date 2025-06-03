import { useState, useCallback, useEffect } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { CommandOptions } from "./components/CommandOption";
import { CommandResult } from "./components/CommandResult";
import { CommandQuery } from "./lib/CommandQuery";
import { CommandButton } from "./components/CommandButton";
import { CommandToolbar } from "./components/CommandToolbar";
import { LoadingResult } from "./components/LoadingResult";
import { ErrorResult } from "./components/ErrorResult";
import { SuccessResult } from "./components/SuccessResult";
import { Fragment } from "react";

export interface Command {
  type: string;
  name: string;
  prompt: string;
  temperature?: number;
  shortcut?: string;
}

export type CommandState = ReadyState | SuccessState | ErrorState;

export interface ReadyState {
  status: "ready" | "loading";
}

export interface SuccessState {
  status: "success";
  result: string;
}

export interface ErrorState {
  status: "error";
  error: Error;
}

interface LogseqAIProps {
  commands: Command[];
  handleCommand: (command: Command, onContent: (content:string) => void) => Promise<string>;
  onInsert: (text: string) => void;
  onReplace: (text: string) => void;
  onClose: () => void;
}

export const LogseqAI = ({
  commands,
  handleCommand,
  onClose,
  onInsert,
  onReplace,
}: LogseqAIProps) => {
  const [commandState, setCommandState] = useState<CommandState>({
    status: "ready",
  });
  const [previousCommand, setPreviousCommand] = useState<Command | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const [query, setQuery] = useState("");
  const commandQuery = new CommandQuery(commands);

  async function runCommand(command: Command) {
    setPreviousCommand(command);
    setQuery(command.name);
    setCommandState({ status: "loading" });
    try {
      let result = "";
      await handleCommand(command, (content) => {
        result += content || "";
        setCommandState({ status: "success", result });
      });
      // setCommandState({ status: "success", result });
    } catch (e) {
      if (e instanceof Error) {
        setCommandState({ status: "error", error: e });
      } else {
        setCommandState({ status: "error", error: new Error("Unknown error") });
      }
    }
  }
  async function runPreviousCommand() {
    if (previousCommand) {
      await runCommand(previousCommand);
    }
  }

  function reset() {
    setQuery("");
    setCommandState({ status: "ready" });
    setSelectedText("");
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (commandState.status === "success" && event.key === "Enter") {
        onInsert(commandState.result);
        reset();
      }
    },
    [commandState]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  let result;
  if (commandState.status === "ready") {
    result = (
      <Combobox.Options
        className="max-h-96 overflow-y-auto scrollbar-hide"
        static
      >
        <div className="px-6 py-4">
          <CommandOptions commands={commandQuery.query(query)} />
        </div>
      </Combobox.Options>
    );
  } else {
    const insertDisabled = commandState.status !== "success";
    const regenerateDisabled =
      commandState.status !== "success" && commandState.status !== "error";

    const commandToolbar = (
      <CommandToolbar
        left={
          <CommandButton
            disabled={regenerateDisabled}
            onClick={runPreviousCommand}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </CommandButton>
        }
        right={
          <>
            <CommandButton
              disabled={insertDisabled}
              onClick={() => {
                commandState.status === "success" &&
                  onReplace(commandState.result);
                reset();
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Replace
            </CommandButton>
            <CommandButton
              disabled={insertDisabled}
              onClick={() => {
                commandState.status === "success" &&
                  onInsert(commandState.result);
                reset();
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Insert ⏎
            </CommandButton>
            <CommandButton
              disabled={!selectedText}
              onClick={() => {
                selectedText && onReplace(selectedText);
                reset();
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Replace by selected
            </CommandButton>
          </>
        }
      />
    );

    let commandResult;
    if (commandState.status === "loading") {
      commandResult = <LoadingResult />;
    } else if (commandState.status === "error") {
      commandResult = <ErrorResult message={commandState.error.message} />;
    } else if (commandState.status === "success") {
      commandResult = <SuccessResult 
        result={commandState.result} 
        onSelectionChange={(selectedText: string) => {
          setSelectedText(selectedText);
        }}
      />;
    }

    result = (
      <CommandResult toolbar={commandToolbar}>{commandResult}</CommandResult>
    );
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl transition-all backdrop-blur-xl">
                <div className="relative text-left">
                  {/* Header with gradient and glow effect */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                  
                  <Combobox as="div" onChange={runCommand}>
                    {/* Search Input */}
                    <div className="relative border-b border-slate-700/50 bg-slate-800/50">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 text-blue-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <Combobox.Input
                          id="logseq-openai-search"
                          autoFocus={true}
                          className="flex-1 py-4 pr-4 text-lg font-medium text-white placeholder-slate-400 bg-transparent border-0 outline-none focus:placeholder-slate-500 transition-colors"
                          placeholder="Type a command or search for template..."
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setCommandState({ status: "ready" });
                          }}
                          displayValue={() => query}
                          value={query}
                        />
                        {query && (
                          <button
                            onClick={() => {
                              setQuery("");
                              setCommandState({ status: "ready" });
                            }}
                            className="mr-3 p-1 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-700/50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      {/* Loading indicator for input */}
                      {commandState.status === "loading" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                        </div>
                      )}
                    </div>

                    {/* Results Area */}
                    <div className="relative">
                      {result}
                    </div>
                  </Combobox>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
