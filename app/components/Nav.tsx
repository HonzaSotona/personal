"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "~/home" },
  { href: "#o-mne", label: "~/o-mne" },
  { href: "#cenik", label: "~/cenik" },
  { href: "#kontakt", label: "~/kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled
          ? "bg-[rgba(0,10,5,0.85)] backdrop-blur border-b border-[rgba(0,255,156,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#home" className="text-[var(--accent)] glow font-bold tracking-wider">
          &gt; dev_<span className="cursor-blink">|</span>
        </a>
        <ul className="flex gap-1 sm:gap-4 text-xs sm:text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-2 py-1 hover:text-[var(--accent)] hover:glow transition"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
