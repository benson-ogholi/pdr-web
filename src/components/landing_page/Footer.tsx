"use client";

import { ArrowUp } from "lucide-react";

const NAV_LINKS = [
  { label: "Company", href: "#" },
  { label: "FAQ", href: "#faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#161B22] px-6 pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-6">
            <p className="text-[19px] font-semibold text-white">PadimanRoute</p>
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-white/50">
              Cross-border shipping and travel, run by a network of verified
              travelers instead of a warehouse.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="mb-5 text-[13px] font-medium text-white/40">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-[14.5px] font-medium text-white/70">
                Company
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14.5px] text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & support */}
          <div className="lg:col-span-3">
            <p className="mb-5 text-[13px] font-medium text-white/40">
              Legal &amp; support
            </p>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14.5px] text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 text-[13.5px] leading-relaxed text-white/40">
                Contact: info@padimanroute.com
                <br />
                Port Harcourt, Nigeria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center">
          <p className="text-[13px] text-white/40">
            © 2026 Padiman Route Technologies. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </footer>
  );
}
