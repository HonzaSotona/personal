type Props = {
  command: string;
  title: string;
};

export default function SectionHeader({ command, title }: Props) {
  return (
    <div className="mb-8">
      <div className="text-[var(--muted)] text-sm">
        <span className="text-[var(--accent)]">$</span> {command}
      </div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--accent)] glow tracking-wide">
        // {title}
      </h2>
      <div className="ascii-divider mt-2 text-xs">
        ─────────────────────────────────────────────
      </div>
    </div>
  );
}
