import React from "react";
import {
  Truck,
  Wrench,
  Users,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  QrCode,
} from "lucide-react";

/**
 * Internal product directory — restyled for a clean, white, professional
 * surface. QR codes are rendered via the public qrserver.com image API
 * (no extra dependency / build step needed) so each card is scannable
 * straight to its Play Store listing.
 *
 * Descriptions are written from each product's own site metadata, not
 * generic marketing copy — Padiman Route has no public Play Store
 * listing yet (only a console dashboard was provided), so that card
 * shows "Not yet published" instead of a broken QR code.
 */

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  packageId: string | null;
  playStoreUrl: string | null;
  consoleUrl?: string;
  consoleAppId?: string;
  icon: React.ReactNode;
  features: string[];
  accent: {
    text: string;
    bg: string;
    border: string;
    ring: string;
  };
}

const qrSrc = (data: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=6&data=${encodeURIComponent(
    data
  )}`;

const products: Product[] = [
  {
    id: "padiman-route",
    name: "Padiman Route",
    category: "Logistics & Ride-Sharing",
    description:
      "A logistics and ride-sharing platform for Nigeria. Senders get parcels delivered by travelers already heading the same way, and riders book transport on the same network — fast, affordable, and tracked door to door.",
    website: "https://www.padimanroute.com",
    packageId: "com.padimanroute.app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.padimanroute.app",
    consoleUrl:
      "https://play.google.com/console/u/0/developers/6678170388405432784/app/4975165755907738903/app-dashboard",
    consoleAppId: "4975165755907738903",
    icon: <Truck className="h-6 w-6" />,
    features: [
      "Peer-to-peer parcel matching along a traveler's route",
      "Ride-sharing alongside delivery requests",
      "Live GPS tracking from pickup to drop-off",
      "Operating across Nigeria",
    ],
    accent: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      ring: "hover:border-emerald-300",
    },
  },
  {
    id: "padiman-utility",
    name: "Padiman Utility",
    category: "Equipment & Workforce Marketplace",
    description:
      "A marketplace connecting people who need equipment, vehicles, or skilled professionals with verified owners and providers — built for project managers who need machinery or manpower without owning either.",
    website: "https://www.padimanutility.com",
    packageId: "com.padimanutility.app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.padimanutility.app",
    icon: <Wrench className="h-6 w-6" />,
    features: [
      "Hire heavy machinery, tractors, and commercial transport",
      "Book certified skilled tradespeople on demand",
      "Owners and providers are verified before listing",
      "List idle equipment or expertise to earn from it",
    ],
    accent: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      ring: "hover:border-amber-300",
    },
  },
  {
    id: "kokohor-circle",
    name: "Kokohor Circle",
    category: "Private Family Network",
    description:
      "A private, family-only space for staying connected across generations — not a public social network. Built to hold family history, coordinate decisions, and keep conversations inside the family.",
    website: "https://www.kokohorcircle.com",
    packageId: "com.kokohor.app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.kokohor.app",
    icon: <Users className="h-6 w-6" />,
    features: [
      "Multi-generational family tree and heritage archive",
      "Family decision-making and voting tools",
      "End-to-end encrypted messaging",
      "Private membership — invitation only",
    ],
    accent: {
      text: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      ring: "hover:border-indigo-300",
    },
  },
  {
    id: "watalopia",
    name: "Watalopia",
    category: "Cooperative Savings Platform",
    description:
      "A digital take on the traditional thrift cooperative. Members pool contributions into a shared treasury, earn quarterly cash yields, and can access flexible micro-credit against their savings.",
    website: "https://www.watalopia.com",
    packageId: "com.watalopia.app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.watalopia.app",
    icon: <Smartphone className="h-6 w-6" />,
    features: [
      "Pooled member contributions into a shared treasury",
      "Quarterly cash yields on cooperative savings",
      "Flexible micro-credit for members",
      "Digital record of every member's standing",
    ],
    accent: {
      text: "text-sky-600",
      bg: "bg-sky-50",
      border: "border-sky-200",
      ring: "hover:border-sky-300",
    },
  },
];

export default function ProductDirectory() {

  return (
    <div className="min-h-screen bg-white p-4 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <header className="space-y-3 mt-24 border-b border-slate-100 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Apps
            Overview
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Products
          </h1>
          <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
            Every live and in-development app across the portfolio, with store
            links, package identifiers, and a scan code for each Play Store
            listing.
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {products.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-[22px] border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${item.accent.border} ${item.accent.ring}`}
            >
              <div className="space-y-5">
                {/* Title row */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.accent.bg} ${item.accent.text}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">
                      {item.name}
                    </h2>
                    <span
                      className={`mt-0.5 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${item.accent.bg} ${item.accent.text}`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>

                {/* Features */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Core Capabilities
                  </span>
                  <ul className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                    {item.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-slate-600"
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${item.accent.text}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer: identifiers, console, store + QR */}
              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
           


                {/* Website */}
                <a
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  Website <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>

                {/* Play Store — large scan panel */}
                {item.playStoreUrl ? (
                  <a
                    href={item.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-[#f4f4f4] p-5 text-center text-white transition-colors"
                  >
                    <img
                      src={qrSrc(item.playStoreUrl)}
                      alt={`Scan to download ${item.name} on Google Play`}
                      className="h-48 w-48 rounded-xl bg-white p-2.5 sm:h-56 sm:w-56"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Scan to install
                      </p>
                      <p className="text-sm font-bold text-[#000]">
                        Google Play
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400">
                        Or open listing <ExternalLink className="h-2.5 w-2.5" />
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-slate-400">
                    <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-white sm:h-56 sm:w-56">
                      <QrCode className="h-12 w-12 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Google Play
                      </p>
                      <p className="text-sm font-bold text-slate-500">
                        Not yet published
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
