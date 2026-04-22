"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import SectionHeader from "./SectionHeader";
import ContactForm from "./ContactForm";

const contacts = [
  { key: "email", value: "vas@email.cz", href: "mailto:vas@email.cz" },
  { key: "telefon", value: "+420 777 000 000", href: "tel:+420777000000" },
  { key: "github", value: "github.com/vas-profil", href: "https://github.com/" },
  { key: "linkedin", value: "linkedin.com/in/vas-profil", href: "https://linkedin.com/" },
];

export default function Contact() {
  return (
    <section id="kontakt" className="px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeader command="./kontakt.sh" title="Kontakt" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalWindow title="~/kontakt">
            <div className="space-y-4">
              <div>
                <span className="text-[var(--muted)]">$</span> echo &quot;Máte projekt?
                Napište mi.&quot;
              </div>
              <div className="text-[var(--accent)] glow text-lg">
                &gt; Máte projekt? Napište mi.
              </div>

              <div className="pt-4 grid sm:grid-cols-2 gap-3">
                {contacts.map((c) => (
                  <a
                    key={c.key}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="terminal-border rounded px-4 py-3 flex items-center gap-3 hover:text-[var(--accent)] hover:border-[var(--accent)] transition group"
                  >
                    <span className="text-[var(--muted)] text-xs uppercase tracking-widest w-16">
                      {c.key}
                    </span>
                    <span className="text-sm truncate group-hover:glow">{c.value}</span>
                  </a>
                ))}
              </div>

              <div className="pt-6 text-xs text-[var(--muted)]">
                <span className="text-[var(--accent)]">$</span> Odpovídám obvykle do 24
                hodin.
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        <div className="mt-6">
          <ContactForm />
        </div>

        <div className="mt-12 text-center text-xs text-[var(--muted)]">
          <div className="ascii-divider mb-3">
            ─────────────────────────────────────────────
          </div>
          <div>
            © {new Date().getFullYear()} webový vývojář ·{" "}
            <span className="text-[var(--accent)]">status: </span>
            <span className="text-[var(--foreground)]">online</span>
            <span className="cursor-blink text-[var(--accent)]">_</span>
          </div>
        </div>
      </div>
    </section>
  );
}
