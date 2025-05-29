import { ReactElement } from "react";

export const CommandToolbar = ({
  left,
  right,
}: {
  left: ReactElement;
  right: ReactElement;
}) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/50">
    <div className="flex space-x-2">{left}</div>
    <div className="flex space-x-2">{right}</div>
  </div>
);
