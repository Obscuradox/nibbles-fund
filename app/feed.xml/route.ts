export const dynamic = "force-static";

const LETTERS = [
  {
    id: "q1-2026",
    title: "Q1 2026 — The First Quarter Proceeded",
    date: "2026-04-01T12:00:00Z",
    content: "To the Fund Participants, the first quarter proceeded as expected, which is to say it proceeded. Volatility was offered and we declined. Several positions matured along predicted timelines. One did not. We observed it. We will observe it again. It will, in time, mature as well.",
  },
  {
    id: "q4-2025",
    title: "Q4 2025 — The Year in Seeds",
    date: "2026-01-01T12:00:00Z",
    content: "The year ended as years tend to. Seeds I–III were correct. Seeds IV–VII were also correct, but the details are reserved. The Fund continues. Deborah continues. The hamster continues.",
  },
  {
    id: "q3-2025",
    title: "Q3 2025 — On Patience",
    date: "2025-10-01T12:00:00Z",
    content: "Patience compounds. So does impatience, though in a different direction. In Q3 we were patient. The returns observed us being patient. We thank them for their attention.",
  },
  {
    id: "q2-2025",
    title: "Q2 2025 — A Letter Regarding Craig",
    date: "2025-07-01T12:00:00Z",
    content: "This quarter saw an incident involving Craig. The incident was handled. Further detail is not necessary. The Fund continues.",
  },
];

export async function GET() {
  const siteUrl = "https://nibblesfund.com";
  const now = new Date().toUTCString();

  const items = LETTERS.map(
    (l) => `
    <item>
      <title><![CDATA[${l.title}]]></title>
      <link>${siteUrl}/#philosophy</link>
      <guid isPermaLink="false">nibblesfund:${l.id}</guid>
      <pubDate>${new Date(l.date).toUTCString()}</pubDate>
      <author>M. Nibbles, via Deborah</author>
      <description><![CDATA[${l.content}]]></description>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Nibbles Fund · Quarterly Letters</title>
    <link>${siteUrl}</link>
    <description>Dispatches from Mr. Nibbles, as transcribed by Deborah.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>deborah@nibblesfund.com (Deborah)</managingEditor>
    <image>
      <url>${siteUrl}/images/logo-pfp.png</url>
      <title>The Nibbles Fund</title>
      <link>${siteUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
