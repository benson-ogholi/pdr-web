"use client";

import { Mail, MapPin, ArrowRight } from "lucide-react";

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Inquiries",
    heading: "Email Us At",
    value: "info@padimanroute.com",
    href: "mailto:info@padimanroute.com",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    heading: "Based In",
    value: "Port Harcourt, Nigeria",
  },
];

export default function ContactSection() {
  return (
    <section className="w-full bg-[#F7F6F2] px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 max-w-2xl sm:mb-20">
          <p className="mb-4 text-[13px] font-medium text-[#6D28D9]">
            Direct line
          </p>
          <h2 className="text-[36px] font-semibold leading-[1.15] tracking-tight text-[#161B22] sm:text-[46px]">
            Let's build the future together.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#161B22]/60">
            Have questions about partnership, shipping corridors, or becoming a
            verified traveler? We're ready to help.
          </p>
        </div>

        {/* Info cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INFO_CARDS.map((card) => {
            const Icon = card.icon;
            const content = (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#161B22]/45">
                    {card.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F6F2]">
                    <Icon className="h-4 w-4 text-[#6D28D9]" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <p className="text-[13.5px] text-[#161B22]/45">
                    {card.heading}
                  </p>
                  <p className="mt-1 text-[18px] font-medium text-[#161B22]">
                    {card.value}
                  </p>
                </div>
              </>
            );

            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                className="rounded-3xl border border-[#161B22]/[0.06] bg-white p-8 transition-colors hover:border-[#161B22]/15"
              >
                {content}
              </a>
            ) : (
              <div
                key={card.label}
                className="rounded-3xl border border-[#161B22]/[0.06] bg-white p-8"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#161B22] p-9 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-[19px] font-semibold text-white">
              Ready to start shipping or traveling?
            </h3>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/55">
              Send us an email and let's get you connected to the network.
            </p>
          </div>
          <a
            href="mailto:info@padimanroute.com"
            className="group flex shrink-0 items-center gap-2 rounded-full bg-[#6D28D9] px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#5B21B6]"
          >
            Start a conversation
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
