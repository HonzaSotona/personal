"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceSuffix?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    id: "web",
    name: "Webová prezentace",
    tagline: "// ideální pro firmy, živnostníky a osobní značku",
    price: 15000,
    priceSuffix: "od",
    features: [
      "Responzivní design na míru",
      "Až 5 podstránek",
      "SEO optimalizace",
      "Kontaktní formulář",
      "Nasazení + doména + SSL",
      "Rychlé načítání (90+ PageSpeed)",
    ],
    cta: "./objednat-web",
  },
  {
    id: "eshop",
    name: "E-shop / Webová aplikace",
    tagline: "// pro projekty s vyšší náročností a rozpočtem",
    price: 45000,
    priceSuffix: "od",
    features: [
      "Kompletní e-shop nebo aplikace na míru",
      "Platební brána (Stripe / GoPay)",
      "Administrační rozhraní",
      "Napojení na ERP / API",
      "Správa produktů a objednávek",
      "Hosting + podpora 3 měsíce",
    ],
    cta: "./objednat-eshop",
    highlight: true,
  },
];

function formatCZK(n: number) {
  return new Intl.NumberFormat("cs-CZ").format(n);
}

export default function Pricing() {
  return (
    <section id="cenik" className="px-4 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader command="./cenik.sh --list" title="Ceník služeb" />

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`terminal-border rounded-md p-6 relative flex flex-col ${
                plan.highlight ? "border-[rgba(0,255,204,0.6)]" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-4 px-2 py-0.5 text-[10px] tracking-wider bg-[var(--accent)] text-black rounded">
                  // DOPORUČENO
                </div>
              )}

              <div className="text-[var(--muted)] text-xs mb-1">
                $ cat ./{plan.id}.md
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--accent)] glow">
                {plan.name}
              </h3>
              <div className="text-xs text-[var(--muted)] mt-1">{plan.tagline}</div>

              <div className="mt-6 mb-6 flex items-baseline gap-2">
                {plan.priceSuffix && (
                  <span className="text-sm text-[var(--muted)]">{plan.priceSuffix}</span>
                )}
                <span className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] glow">
                  {formatCZK(plan.price)}
                </span>
                <span className="text-lg text-[var(--amber)]">Kč</span>
              </div>

              <ul className="space-y-2 text-sm flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[var(--accent)]">[✓]</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#kontakt"
                className="mt-6 terminal-border text-center py-3 hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-xs text-[var(--muted)] text-center">
          <span className="text-[var(--accent)]">#</span> Ceny jsou orientační a konečná
          nabídka závisí na rozsahu projektu. Nejsem plátce DPH.
        </div>
      </div>
    </section>
  );
}
