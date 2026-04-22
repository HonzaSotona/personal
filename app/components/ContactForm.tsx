"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(json.error ?? "Odeslání se nezdařilo.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Síťová chyba. Zkontrolujte připojení.");
      setStatus("error");
    }
  }

  const disabled = status === "sending";

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="terminal-border rounded-md p-5 sm:p-6 space-y-4"
      noValidate
    >
      <div className="text-[var(--muted)] text-xs">
        <span className="text-[var(--accent)]">$</span> ./odeslat-zpravu --interactive
      </div>

      <div
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none -z-10"
        style={{ position: "absolute", left: "-9999px" }}
      >
        <label>
          Firma (nevyplňujte)
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label="jmeno" placeholder="Jan Novák" required disabled={disabled} />
        <Field
          name="email"
          type="email"
          label="email"
          placeholder="jan@firma.cz"
          required
          disabled={disabled}
        />
      </div>

      <Field
        name="phone"
        type="tel"
        label="telefon"
        placeholder="+420 777 000 000 (volitelné)"
        disabled={disabled}
      />

      <label className="block">
        <span className="text-[var(--muted)] text-xs uppercase tracking-widest">
          &gt; zprava
        </span>
        <textarea
          name="message"
          required
          rows={6}
          disabled={disabled}
          placeholder="Popište mi prosím váš projekt, představu a termíny..."
          className="mt-2 w-full bg-black/40 border border-[rgba(0,255,156,0.3)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_1px_var(--accent)] resize-y placeholder:text-[var(--muted)]/60 disabled:opacity-60"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={disabled}
          className="terminal-border px-5 py-2.5 text-sm hover:text-[var(--accent)] hover:border-[var(--accent)] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <span className="cursor-blink">▋</span> odesílám...
            </>
          ) : (
            <>./odeslat</>
          )}
        </button>

        {status === "success" && (
          <span className="text-[var(--accent)] text-sm glow">
            [ OK ] Zpráva odeslána — ozvu se brzy.
          </span>
        )}
        {status === "error" && (
          <span className="text-[var(--danger)] text-sm">
            [ ERR ] {errorMsg}
          </span>
        )}
      </div>
    </motion.form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-[var(--muted)] text-xs uppercase tracking-widest">
        &gt; {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-2 w-full bg-black/40 border border-[rgba(0,255,156,0.3)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_1px_var(--accent)] placeholder:text-[var(--muted)]/60 disabled:opacity-60"
      />
    </label>
  );
}
