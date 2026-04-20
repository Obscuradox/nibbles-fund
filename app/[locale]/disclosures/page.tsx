import Link from "next/link";

export const metadata = {
  title: "Form ADV Part 2 — The Nibbles Fund",
  description: "Brochure filing of The Nibbles Fund, as required by regulation.",
};

const ITEMS = [
  {
    n: "1",
    title: "Cover Page",
    body: [
      "The Nibbles Fund, LP. CIK 0001984213. Principal Office: Shoebox, Apartment 4B, Fort Lee, NJ.",
      "This brochure provides information about the qualifications and business practices of The Nibbles Fund. If you have any questions about the contents of this brochure, direct them to Deborah.",
      "Deborah will consider your question.",
    ],
  },
  {
    n: "2",
    title: "Material Changes",
    body: [
      "Since the last annual update, the following material changes have occurred:",
      "None. Mr. Nibbles does not believe in material change.",
    ],
  },
  {
    n: "3",
    title: "Advisory Business",
    body: [
      "The Adviser provides discretionary investment management services. The Adviser is a hamster. The Adviser is discretionary in temperament as well as in legal character.",
      "Amount in the stash, last time Deborah counted: $4.2M (approximate, unaudited, aspirational).",
      "The Adviser tailors advisory services to the individual needs of clients who have not been accepted as clients.",
    ],
  },
  {
    n: "4",
    title: "Fees and Compensation",
    body: [
      "The Adviser charges a management fee of 2% per annum, assessed quarterly in arrears.",
      "A performance fee of 20% applies above the high-water mark.",
      "Payment may be remitted in USD, SOL, or sunflower seeds. The Adviser prefers sunflower seeds.",
      "Fees are not negotiable. Neither is Deborah.",
    ],
  },
  {
    n: "5",
    title: "Performance-Based Fees and Side-by-Side Management",
    body: [
      "The Adviser charges performance-based fees from the Fund. The Adviser does not manage other vehicles.",
      "There is no side-by-side conflict because there is no side.",
    ],
  },
  {
    n: "6",
    title: "Types of Clients",
    body: [
      "The Adviser provides investment advisory services to: (a) The Nibbles Fund; (b) Deborah.",
      "No outside clients are accepted. No outside clients have applied. Deborah prefers this arrangement.",
    ],
  },
  {
    n: "7",
    title: "Methods of Analysis, Investment Strategies, and Risk of Loss",
    body: [
      "Methods of Analysis: Seeds.",
      "Specifically, the Seven Seeds framework. Seeds I through III are disclosed on the Fund's public materials. Seeds IV through VII are proprietary.",
      "Risk of Loss: Clients should be aware that investment in securities involves risk of loss. The Adviser has never realized such a loss in practice. This is not a representation that such a loss cannot occur.",
    ],
  },
  {
    n: "8",
    title: "Disciplinary Information",
    body: [
      "The Adviser has no disciplinary events to disclose. The Adviser is a hamster.",
    ],
  },
  {
    n: "9",
    title: "Other Financial Industry Activities and Affiliations",
    body: [
      "The Adviser has no outside financial industry activities.",
      "Craig is listed as Chief Executive Officer of The Fund. Craig has outside activities. Craig is not the Adviser.",
    ],
  },
  {
    n: "10",
    title: "Code of Ethics",
    body: [
      "The Adviser's Code of Ethics is the Seven Seeds.",
      "A copy is available on request. Requests are considered. Copies are not provided.",
    ],
  },
  {
    n: "11",
    title: "Brokerage Practices",
    body: [
      "Brokerage: Jupiter. Custody: Phantom Wallet. The Adviser aggregates transactions where practicable. In practice, the Adviser transacts infrequently.",
    ],
  },
  {
    n: "12",
    title: "Review of Accounts",
    body: [
      "Mr. Nibbles reviews. That is the review.",
      "Deborah summarizes. That is the summary.",
      "Craig is not involved in review.",
    ],
  },
  {
    n: "13",
    title: "Client Referrals and Other Compensation",
    body: [
      "The Adviser does not compensate any person for client referrals. The Adviser does not have clients.",
    ],
  },
  {
    n: "14",
    title: "Deborah",
    body: [
      "The Adviser does not accept personal checks, wire transfers, or grievances.",
      "All inquiries are to be addressed to Deborah. Deborah is not obligated to respond.",
      "This Item 14 is provided in lieu of standard compliance disclosures because the standard disclosures have already been provided by implication.",
    ],
  },
];

export default function Disclosures() {
  return (
    <div className="bg-white min-h-screen py-16 text-black" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="mx-auto max-w-3xl px-6">
        <header className="border-b-2 border-black pb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em]">Brochure · Part 2A of Form ADV</p>
          <h1 className="mt-2 text-4xl font-bold">THE NIBBLES FUND, LP</h1>
          <p className="mt-2 text-sm">SEC File No. 801-00000 · CIK 0001984213</p>
          <p className="mt-2 text-sm">Brochure Date: January 15, 2026</p>
        </header>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.75]">
          {ITEMS.map((item) => (
            <section key={item.n} className="break-inside-avoid">
              <h2 className="text-xl font-bold">Item {item.n}. {item.title}</h2>
              {item.body.map((p, i) => (
                <p key={i} className="mt-3">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-black pt-6 text-center text-xs">
          <p>Brochure ends here. No Supplement follows.</p>
          <p className="mt-2">Signed: /s/ M. Nibbles, by Deborah (under power of attorney)</p>
          <Link href="/" className="mt-6 inline-block text-xs underline">Return to The Fund</Link>
        </footer>
      </div>
    </div>
  );
}
