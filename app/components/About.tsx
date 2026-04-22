"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import SectionHeader from "./SectionHeader";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Vercel",
];

export default function About() {
  return (
    <section id="o-mne" className="px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeader command="cat /etc/o-mne.txt" title="O mně" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalWindow title="~/o-mne.txt">
            <div className="space-y-4">
              <p>
                <span className="text-[var(--muted)]">#</span> Jsem{" "}
                <span className="text-[var(--accent)] glow">webový vývojář</span>{" "}
                se zaměřením na moderní, rychlé a čisté weby.
              </p>
              <p>
                Tvořím na míru — od jednoduchých prezentací po komplexní
                e-shopy a webové aplikace. Každý projekt řeším jako
                individuální zadání, ne jako šablonu.
              </p>
              <p>
                Dbám na <span className="text-[var(--amber)]">výkon</span>,{" "}
                <span className="text-[var(--amber)]">SEO</span>,{" "}
                <span className="text-[var(--amber)]">přístupnost</span> a
                čistý kód, který se dá udržovat.
              </p>

              <div className="pt-4">
                <div className="text-[var(--muted)] text-xs mb-2">
                  $ ls ./tech-stack/
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs terminal-border rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 grid grid-cols-3 gap-4 text-center">
                <Stat value="5+" label="let zkušeností" />
                <Stat value="40+" label="projektů" />
                <Stat value="∞" label="řádků kódu" />
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="terminal-border rounded p-3">
      <div className="text-2xl sm:text-3xl text-[var(--accent)] glow">{value}</div>
      <div className="text-xs text-[var(--muted)] mt-1">{label}</div>
    </div>
  );
}
