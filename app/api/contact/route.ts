import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "sotona.jan0@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Vyplňte prosím jméno." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Zadejte platný e-mail." }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ error: "Zpráva je příliš krátká." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Zpráva je příliš dlouhá." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY env var");
    return NextResponse.json(
      { error: "Odesílání e-mailů není zatím nakonfigurováno." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: ui-monospace, Menlo, monospace; background:#000; color:#00ff9c; padding:24px;">
      <h2 style="color:#00ffcc;">&gt; Nová zpráva z portfolia</h2>
      <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
      <hr style="border-color:#008f5a;" />
      <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const text =
    `Nová zpráva z portfolia\n\n` +
    `Jméno: ${name}\n` +
    `E-mail: ${email}\n` +
    (phone ? `Telefon: ${phone}\n` : "") +
    `\n${message}\n`;

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Nová zpráva z webu — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Neočekávaná chyba. Zkuste to prosím později." },
      { status: 500 }
    );
  }
}
