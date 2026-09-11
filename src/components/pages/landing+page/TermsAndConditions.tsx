import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * PadimanRoute — Terms of Service
 *
 * A sticky, scroll-spied table of contents next to the actual terms —
 * the pattern serious products use (Stripe, Notion) instead of one long
 * unstructured wall of text. Typography and accent color match the rest
 * of the site (font-black tracking-tighter headings, #9C2583 accents).
 *
 * NOTE: the section copy below is a structural starting draft, not
 * legal advice — have counsel review before this goes live.
 */

const SECTIONS = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "service", label: "Description of Service" },
  { id: "eligibility", label: "Eligibility & Accounts" },
  { id: "sender", label: "Sender Responsibilities" },
  { id: "traveler", label: "Traveler Responsibilities" },
  { id: "prohibited", label: "Prohibited Items" },
  { id: "payments", label: "Payments & Fees" },
  { id: "cancellations", label: "Cancellations & Refunds" },
  { id: "liability", label: "Liability & Insurance" },
  { id: "disputes", label: "Dispute Resolution" },
  { id: "termination", label: "Suspension & Termination" },
  { id: "changes", label: "Changes to These Terms" },
  { id: "law", label: "Governing Law" },
  { id: "contact", label: "Contact Us" },
];

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export const TermsPage = () => {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));

  function handleTocClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-white text-slate-950">
      <style>{`
        .prose-terms li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: #9C2583;
        }
      `}</style>

      {/* Header */}
      <div className="border-b border-slate-100 pb-16 pt-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9C2583]" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Legal
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Last updated: September 11, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 flex flex-col gap-0.5 border-l border-slate-100">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => handleTocClick(e, s.id)}
                  className={`-ml-px border-l-2 py-1.5 pl-4 text-sm font-medium transition-colors duration-200 ${
                    activeId === s.id
                      ? "border-[#9C2583] text-slate-950"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex max-w-2xl flex-col gap-16">
            <Section id="acceptance" title="Acceptance of Terms">
              <p>
                By creating an account, posting a shipment, or registering as
                a traveler on PadimanRoute, you agree to be bound by these
                Terms of Service and our Privacy Policy. If you do not agree,
                please do not use the platform.
              </p>
            </Section>

            <Section id="service" title="Description of Service">
              <p>
                PadimanRoute is a peer-to-peer platform that connects
                Senders who need to move items with Travelers already
                heading in that direction. We are a marketplace and
                communications layer — PadimanRoute does not itself take
                physical possession of, warehouse, or transport items.
              </p>
            </Section>

            <Section id="eligibility" title="Eligibility & Accounts">
              <ul>
                <li>You must be at least 18 years old to use PadimanRoute.</li>
                <li>
                  You're responsible for keeping your account credentials
                  confidential and for all activity under your account.
                </li>
                <li>
                  Travelers must complete identity verification before
                  accepting a shipment.
                </li>
              </ul>
            </Section>

            <Section id="sender" title="Sender Responsibilities">
              <ul>
                <li>
                  Accurately describe the item, its dimensions, weight, and
                  value at the time of posting.
                </li>
                <li>
                  Confirm the item does not fall under the Prohibited Items
                  list below.
                </li>
                <li>
                  Be reasonably available for handover and delivery
                  coordination with the matched traveler.
                </li>
              </ul>
            </Section>

            <Section id="traveler" title="Traveler Responsibilities">
              <ul>
                <li>
                  Only accept shipments you can reasonably carry and deliver
                  on your stated route and timeline.
                </li>
                <li>
                  Handle items with reasonable care and keep the Sender
                  updated through the app's tracking flow.
                </li>
                <li>
                  Do not open, alter, or substitute the contents of any
                  shipment.
                </li>
              </ul>
            </Section>

            <Section id="prohibited" title="Prohibited Items">
              <p>The following may never be shipped through PadimanRoute:</p>
              <ul>
                <li>Illegal drugs, narcotics, or drug paraphernalia</li>
                <li>Firearms, ammunition, or explosives</li>
                <li>Hazardous, flammable, or toxic materials</li>
                <li>Counterfeit goods or stolen property</li>
                <li>Live animals</li>
                <li>Cash, bullion, or negotiable instruments above local limits</li>
                <li>Perishable goods, unless both parties explicitly agree</li>
              </ul>
            </Section>

            <Section id="payments" title="Payments & Fees">
              <p>
                Sender payments are held until the traveler confirms
                successful delivery. PadimanRoute deducts a service fee,
                disclosed before you confirm a shipment, from each
                completed transaction. Travelers receive payouts through
                their linked payment method after delivery confirmation.
              </p>
            </Section>

            <Section id="cancellations" title="Cancellations & Refunds">
              <p>
                Senders may cancel before a traveler accepts the shipment for
                a full refund. Once accepted, cancellation fees may apply.
                Refund eligibility after pickup is assessed case-by-case
                through support.
              </p>
            </Section>

            <Section id="liability" title="Liability & Insurance">
              <p>
                PadimanRoute's liability is limited to the transaction fee
                paid for the relevant shipment, except where prohibited by
                law. We do not guarantee delivery timelines and are not
                liable for delays outside a traveler's reasonable control
                (flight changes, customs holds, weather). Optional shipment
                insurance, where offered, is subject to separate terms.
              </p>
            </Section>

            <Section id="disputes" title="Dispute Resolution">
              <p>
                Most issues should first be raised through in-app support.
                If unresolved, disputes will be handled through good-faith
                negotiation before either party pursues formal proceedings.
              </p>
            </Section>

            <Section id="termination" title="Suspension & Termination">
              <p>
                We may suspend or terminate accounts that violate these
                Terms, misrepresent shipment contents, or engage in
                fraudulent activity, with or without notice depending on
                severity.
              </p>
            </Section>

            <Section id="changes" title="Changes to These Terms">
              <p>
                We may update these Terms from time to time. Material
                changes will be notified in-app or by email before they take
                effect. Continued use after changes take effect constitutes
                acceptance.
              </p>
            </Section>

            <Section id="law" title="Governing Law">
              <p>
                These Terms are governed by the laws of the Federal Republic
                of Nigeria, without regard to conflict-of-law principles.
              </p>
            </Section>

            <Section id="contact" title="Contact Us">
              <p>Questions about these Terms can be sent to:</p>
              <a
                href="mailto:info@padimanroute.com"
                className="group mt-2 inline-flex items-center gap-1.5 text-base font-bold text-slate-950 transition-colors duration-200 hover:text-[#9C2583]"
              >
                info@padimanroute.com
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <p className="mt-6 text-sm text-slate-400">
                Also see our{" "}
                <Link to="/privacy" className="font-semibold text-[#9C2583]">
                  Privacy Policy
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="prose-terms mt-4 flex flex-col gap-3 text-[15px] leading-relaxed text-slate-500 [&_li]:relative [&_li]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
        {children}
      </div>
    </section>
  );
}

export default TermsPage;