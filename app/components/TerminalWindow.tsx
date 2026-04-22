import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function TerminalWindow({ title = "bash", children, className = "" }: Props) {
  return (
    <div className={`terminal-border rounded-md overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(0,255,156,0.25)] bg-[rgba(0,20,10,0.5)]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
        <span className="ml-3 text-xs text-[var(--muted)] truncate">— {title} —</span>
      </div>
      <div className="p-5 sm:p-6 text-sm sm:text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}
