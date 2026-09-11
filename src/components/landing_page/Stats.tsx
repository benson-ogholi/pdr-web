import React from "react";

interface MetricItem {
  value?: string;
  label: string;
  description: string;
  imageSrc: string;
  isMissionCard?: boolean;
}

const metrics: MetricItem[] = [
  {
    isMissionCard: true,
    label: "Our mission",
    description:
      "Make interstate travel in Nigeria more affordable, secure, and rewarding for everyday commuters and senders.",
    imageSrc:
      "https://images.unsplash.com/photo-1611448746128-7c39e03b71e4?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "25+",
    label: "Interstate routes",
    description: "Connecting Lagos, Abuja, Port Harcourt, and beyond",
    imageSrc:
      "https://images.unsplash.com/photo-1572401611152-cf63d874b019?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZCUyMHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    value: "₦45,000+",
    label: "Average earnings",
    description: "Average cash earned per interstate trip by travelers",
    imageSrc:
      "https://images.unsplash.com/photo-1637169797848-12431f1d355c?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "50K+",
    label: "Verified users",
    description: "Verified Nigerian travelers and package senders onboard",
    imageSrc:
      "https://images.unsplash.com/photo-1619741982598-7cb8a7959476?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const ByTheNumbers: React.FC = () => {
  return (
    <section className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7F6F2] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
            <span className="text-[13px] font-medium text-[#161B22]/70">
              Nigeria's trusted travel &amp; waybill network
            </span>
          </div>

          <h1 className="text-[36px] font-semibold leading-[1.15] tracking-tight text-[#161B22] sm:text-[46px]">
            Waybill parcels securely, fill empty seats across Nigeria
          </h1>

          <p className="mt-5 text-[16px] leading-relaxed text-[#161B22]/60">
            Heading from Lagos to Abuja, Port Harcourt to Enugu, or Ibadan to
            Benin? Earn cash by carrying verified waybill packages or sharing
            your ride with fellow travelers along your route.
          </p>
        </div>

        {/* CTAs */}
        {/* CTAs */}
        <div className="mb-16 flex flex-col items-center justify-center gap-3 sm:mb-20 sm:flex-row">
          <a
            href="https://play.google.com/store/apps/details?id=com.padimanroute.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#6D28D9] px-7 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#5B21B6]"
          >
            Start earning on your trip
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.padimanroute.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#161B22]/10 bg-white px-7 py-3.5 text-[14.5px] font-medium text-[#161B22] transition-colors hover:bg-[#F7F6F2]"
          >
            Send waybill / book ride
          </a>
        </div>
        {/* Metric cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-[28px] shadow-[0_12px_30px_-12px_rgba(23,15,45,0.25)]"
            >
              {/* Background image */}
              <img
                src={item.imageSrc}
                alt={item.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161B22]/95 via-[#161B22]/45 to-[#6D28D9]/20" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                {item.isMissionCard ? (
                  <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
                    {item.label}
                  </span>
                ) : (
                  <span className="text-[32px] font-semibold text-white sm:text-[36px]">
                    {item.value}
                  </span>
                )}

                <div>
                  {!item.isMissionCard && (
                    <p className="mb-1.5 text-[12.5px] font-medium text-[#E9D8FD]">
                      {item.label}
                    </p>
                  )}
                  <p className="text-[13.5px] leading-relaxed text-white/85">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ByTheNumbers;
