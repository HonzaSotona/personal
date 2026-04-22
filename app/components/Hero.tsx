"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";

const bootLines = [
  { prefix: "[ OK ]", text: "Spouštím dev prostředí...", color: "text-[var(--muted)]" },
  { prefix: "[ OK ]", text: "Načítám node_modules (42 MB)", color: "text-[var(--muted)]" },
  { prefix: "[ OK ]", text: "Připojuji databázi", color: "text-[var(--muted)]" },
  { prefix: "[ OK ]", text: "Kompiluji TypeScript", color: "text-[var(--muted)]" },
  { prefix: "[ >> ]", text: "Vítejte na mém portfoliu.", color: "text-[var(--accent)]" },
];

function useTypewriter(text: string, speed = 40, delay = 0) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut("");
    setDone(false);
    const start = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => clearTimeout(start);
  }, [text, speed, delay]);
  return { out, done };
}

export default function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= bootLines.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 260);
    return () => clearTimeout(t);
  }, [step]);

  const showPrompt = step >= bootLines.length;

  const name = useTypewriter(showPrompt ? "whoami --full" : "", 55, 150);
  const showAnswer = name.done;

  const answerLines = useMemo(
    () => [
      "Ahoj, jsem webový vývojář.",
      "Stavím rychlé weby, e-shopy a aplikace na míru.",
      "Stack: Next.js · React · TypeScript · Tailwind · Node.",
    ],
    []
  );

  return (
    <section id="home" className="relative pt-20 sm:pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TerminalWindow title="dev@portfolio: ~">
            <div className="space-y-1.5">
              {bootLines.slice(0, step).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`${l.color}`}
                >
                  <span className="opacity-80">{l.prefix}</span>{" "}
                  <span>{l.text}</span>
                </motion.div>
              ))}

              {showPrompt && (
                <div className="pt-4">
                  <div>
                    <span className="text-[var(--accent)]">dev@portfolio</span>
                    <span className="text-[var(--muted)]">:</span>
                    <span className="text-[var(--amber)]">~</span>
                    <span className="text-[var(--muted)]">$ </span>
                    <span>{name.out}</span>
                    {!name.done && <span className="cursor-blink">▋</span>}
                  </div>

                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="mt-3 space-y-1"
                    >
                      {answerLines.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + i * 0.18 }}
                          className={i === 0 ? "text-[var(--accent)] glow text-lg sm:text-xl" : "text-[var(--foreground)]"}
                        >
                          {line}
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="pt-4 flex flex-wrap gap-3"
                      >
                        <a
                          href="#cenik"
                          className="terminal-border px-4 py-2 text-sm hover:text-[var(--accent)] transition"
                        >
                          ./zobrazit-cenik
                        </a>
                        <a
                          href="#kontakt"
                          className="terminal-border px-4 py-2 text-sm hover:text-[var(--accent)] transition"
                        >
                          ./napsat-zpravu
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </TerminalWindow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="glitch glow mt-12 text-center font-bold text-3xl sm:text-5xl tracking-wider"
          data-text="&gt; webový vývojář_"
        >
          &gt; webový vývojář<span className="cursor-blink">_</span>
        </motion.h1>
      </div>
    </section>
  );
}
