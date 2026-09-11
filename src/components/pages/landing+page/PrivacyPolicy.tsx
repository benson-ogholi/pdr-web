"use client";

import { useState } from "react";

const SECTIONS = [
  {
    id: "intro",
    title: "1. Introduction",
    body: `Padiman Route ("Padiman Route," "we," "us," or "our") operates a platform that connects travelers who have room on a trip they're already taking ("Travelers") with people who need a parcel delivered or a ride ("Senders" and "Riders," together with Travelers, "Users"). This Privacy Policy explains what information we collect, how we use it, and the choices you have.

By creating an account or using the app, you agree to the collection and use of information as described here. If you don't agree, please don't use Padiman Route.`,
  },
  {
    id: "collect",
    title: "2. Information We Collect",
    body: `We collect information in a few different ways:

Account information: name, email address, phone number, profile photo, and password when you register.

Identity verification: government-issued ID, date of birth, and a selfie or similar biometric check, used to vet members of the community before they can post a route or accept a delivery or ride request.

Location data: real-time and route location data while a delivery or ride is active, and approximate location when browsing available routes, so matching and live tracking can work.

Payment information: billing details processed through our third-party payment processor. We don't store full card numbers on our own servers.

Parcel and trip details: descriptions, photos, pickup/drop-off addresses, and any notes you add to a delivery or ride request.

Communications: messages sent through in-app chat, support requests, and any feedback or ratings you leave.

Device and usage data: IP address, device type, operating system, app version, and general usage patterns, collected automatically.`,
  },
  {
    id: "use",
    title: "3. How We Use Your Information",
    body: `We use the information we collect to:

Match Senders and Riders with Travelers heading the same way.
Verify identity and run safety and vetting checks before someone can join a route or accept a request.
Provide real-time tracking during an active delivery or ride.
Process payments and payouts.
Send confirmations, status updates, and support communications.
Investigate disputes, fraud, or violations of our Terms of Service.
Improve the app and develop new features.
Comply with legal obligations, including tax and transportation-related recordkeeping.`,
  },
  {
    id: "share",
    title: "4. How We Share Your Information",
    body: `With matched Users: when you're matched for a delivery or ride, the other person can see your first name, profile photo, rating, general route, and live tracking status — enough to complete the trip safely, not your full account details.

With service providers: identity-verification vendors, payment processors, mapping and location providers, and customer-support tools, each bound to use your data only to provide their service to us.

For legal reasons: if required by law, subpoena, or to protect the safety of our Users or the public.

In a business transfer: if Padiman Route is involved in a merger, acquisition, or sale of assets, user information may transfer as part of that deal.

We do not sell your personal information to third parties for their own marketing purposes.`,
  },
  {
    id: "retention",
    title: "5. Data Retention",
    body: `We keep your information for as long as your account is active and for a reasonable period afterward to meet legal, tax, safety, and dispute-resolution obligations. Identity-verification records are generally retained longer, consistent with safety and regulatory requirements for transportation and delivery platforms.`,
  },
  {
    id: "rights",
    title: "6. Your Rights and Choices",
    body: `Depending on where you live, you may have the right to access, correct, delete, or export your personal information, and to object to or restrict certain processing. You can update most account details directly in the app, or contact us to make a request.

You can also adjust location and notification permissions through your device settings, though disabling location access will limit or disable core features like matching and live tracking.`,
  },
  {
    id: "security",
    title: "7. Data Security",
    body: `We use reasonable administrative, technical, and physical safeguards to protect your information, including encryption in transit and restricted access to identity-verification data. No method of transmission or storage is completely secure, and we can't guarantee absolute security.`,
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    body: `Padiman Route is intended for users who are 18 or older. We don't knowingly collect information from anyone under 18. If we learn that we've collected information from a minor, we'll delete it.`,
  },
  {
    id: "transfers",
    title: "9. International Data Transfers",
    body: `If you use Padiman Route from outside the country where our servers are located, your information may be transferred to, stored, and processed in a different country. Where required, we use appropriate safeguards for these transfers.`,
  },
  {
    id: "cookies",
    title: "10. Cookies and Tracking Technologies",
    body: `Our website and app use cookies and similar technologies to keep you signed in, remember preferences, and understand how the app is used. You can control cookies through your browser settings; some features may not work properly if you disable them.`,
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. If we make material changes, we'll notify you in the app or by email before they take effect. The "Last updated" date below reflects the most recent version.`,
  },
  {
    id: "contact",
    title: "12. Contact Us",
    body: `If you have questions about this Privacy Policy or want to exercise your data rights, contact us at info@padimanroute.com.`,
  },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  return (
    <section className="w-full bg-[#F7F6F2] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 border-b border-[#161B22]/10 pb-10 sm:mb-16">
          <p className="mb-4 text-[13px] font-medium text-[#C05621]">Legal</p>
          <h1 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-[#161B22] sm:text-[42px]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[15px] text-[#161B22]/50">
            Last updated: 10th September 2026
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* TOC */}
          <nav className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-10 flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveId(s.id)}
                  className={`rounded-lg px-3 py-2 text-[13.5px] leading-snug transition-colors ${
                    activeId === s.id
                      ? "bg-white font-medium text-[#161B22]"
                      : "text-[#161B22]/50 hover:text-[#161B22]/80"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex flex-col gap-12 lg:col-span-9">
            {SECTIONS.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-10">
                <h2 className="mb-4 text-[19px] font-semibold text-[#161B22]">
                  {s.title}
                </h2>
                <div className="flex flex-col gap-4">
                  {s.body
                    .trim()
                    .split("\n\n")
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-[15px] leading-relaxed text-[#161B22]/65"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
