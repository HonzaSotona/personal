import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "~/dev — webový vývojář",
  description:
    "Osobní stránka webového vývojáře. Tvorba moderních webů, e-shopů a aplikací na míru. Ceník v CZK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col crt">{children}</body>
    </html>
  );
}
