import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { jsPDF } from "jspdf";

export const runtime = "nodejs";

function buildPdfBytes(): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("THE NIBBLES FUND", 72, 80);
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.text("Quarterly Tear Sheet — Q1 2026 — Unaudited", 72, 100);
  doc.line(72, 108, 540, 108);

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("Fund Terms", 72, 140);
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  const terms: [string, string][] = [
    ["Management Fee", "2% per annum"],
    ["Performance Fee", "20% above high-water mark"],
    ["Lockup", "90 days"],
    ["Redemption", "Quarterly, 45-day notice"],
    ["Minimum Subscription", "$25 (retail)"],
    ["Institutional Minimum", "$100,000 (currently unavailable)"],
    ["High-Water Mark", "Yes"],
    ["Gate", "At Manager's discretion"],
  ];
  terms.forEach(([k, v], i) => {
    doc.text(`${k}:`, 72, 160 + i * 16);
    doc.text(v, 260, 160 + i * 16);
  });

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("Service Providers", 72, 310);
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  const providers: [string, string][] = [
    ["Administrator", "TBD"],
    ["Custodian", "Phantom Wallet"],
    ["Prime Broker", "Jupiter"],
    ["Auditor", "None currently"],
    ["Legal Counsel", "Non-responsive"],
    ["Tax Advisor", "Deborah"],
  ];
  providers.forEach(([k, v], i) => {
    doc.text(`${k}:`, 72, 330 + i * 16);
    doc.text(v, 260, 330 + i * 16);
  });

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.text("Not for distribution. Mr. Nibbles is a hamster.", 72, 720);

  const buf = doc.output("arraybuffer");
  return new Uint8Array(buf);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;

    // Development / pre-launch fallback — we don't have the key, still succeed
    if (!key) {
      return NextResponse.json({ ok: true, note: "Email queued. Deborah will consider it." });
    }

    const resend = new Resend(key);
    const pdfBytes = buildPdfBytes();

    await resend.emails.send({
      from: "Deborah <deborah@nibblesfund.com>",
      to: email,
      subject: "Your tear sheet, as requested.",
      text:
        "Attached please find the quarterly tear sheet of The Nibbles Fund.\n\n" +
        "This document is informational. It is not a solicitation. It is not an invitation.\n\n" +
        "Deborah",
      attachments: [
        {
          filename: "nibbles-fund-tearsheet.pdf",
          content: Buffer.from(pdfBytes),
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Send failed." }, { status: 500 });
  }
}
