"use client";

import { useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";

const FAQS = [
  {
    question: "How does Padiman Route work?",
    answer:
      "Padiman Route connects travelers with people who need to send a parcel. Drivers post the routes they're already taking, and senders match with a route that fits — turning an empty trip into a convenient, cost-effective delivery.",
  },
  {
    question: "Is it safe to send parcels through the platform?",
    answer:
      "Safety is the priority. Every member of the community goes through a vetting process before they can post a route or accept a parcel, and real-time tracking keeps the journey transparent from pickup to delivery.",
  },
  {
    question: "How are prices determined?",
    answer:
      "Price is based on distance, parcel size and weight, and how much demand there is for that route. You'll see the full cost upfront before you confirm a match — no hidden fees added later.",
  },
  {
    question: "Can I track my journey or parcel?",
    answer:
      "Yes. Once a match is confirmed, both the sender and the traveler get live status updates in the app, from pickup all the way through to delivery, so you always know where things stand.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full bg-[#F7F6F2] px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <p className="mb-4 text-[13px] font-medium text-[#7C3AED]">Support</p>
          <h2 className="text-[36px] font-semibold leading-[1.15] tracking-tight text-[#161B22] sm:text-[44px]">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#161B22]/60">
            Everything you need to know about moving with Padiman Route.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-[#161B22]/10 rounded-3xl border border-[#161B22]/10 bg-white px-2 sm:px-4">
          {FAQS.map((faq, idx) => {
            const isOpen = idx === openIndex;

            return (
              <div key={faq.question} className="py-2">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-[16.5px] font-medium sm:text-[17px] ${
                      isOpen ? "text-[#161B22]" : "text-[#161B22]/85"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-[#7C3AED]" : "bg-[#F7F6F2]"
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-45 text-white" : "text-[#161B22]/50"
                      }`}
                      strokeWidth={2.2}
                    />
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-200 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-10 text-[14.5px] leading-relaxed text-[#161B22]/60">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#161B22] p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-[18px] font-semibold text-white">
              Still have questions?
            </h3>
            <p className="mt-1 text-[14.5px] text-white/55">
              Our support team is always ready to help you.
            </p>
          </div>
          <a
            href="mailto:info@padimanroute.com"
            className="group flex shrink-0 items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#6D28D9]"
          >
            Contact support
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
