import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#f5f3fa] py-32 text-purple-950 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 text-xs font-semibold px-3.5 py-1.5 rounded-full tracking-wide uppercase border border-purple-200/60">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <span>Nigeria's Trusted Peer Transit Network</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-purple-950 leading-[1.1]">
              Send packages <br />
              <span className="text-purple-600">with travelers</span> <br />
              you can trust.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-purple-700/80 text-base sm:text-lg max-w-xl leading-relaxed">
              Skip traditional courier delays and high fees. PadimanRoute
              connects you with verified daily travelers heading straight to
              your package's destination or ready to share their ride across
              Nigeria.
            </p>

            {/* App Download Buttons & QR/Scan Info */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Store Buttons Stack */}
              <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.padimanroute.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-purple-950 hover:bg-purple-900 text-white px-5 py-3 rounded-2xl shadow-md transition transform hover:-translate-y-0.5 group"
                >
                  <svg
                    className="w-7 h-7 text-purple-400 group-hover:text-white transition"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.492 1.492 0 0 1-.86-1.35V3.164a1.492 1.492 0 0 1 .86-1.35zM15.208 13.416l2.122 2.122-10.97 6.333 8.848-8.455zm0-2.832L6.36 2.129l10.97 6.333-2.122 2.122zm1.768 1.768l3.182 1.838a1.25 1.25 0 0 1 0 2.162l-3.182 1.838-2.122-2.122 2.122-2.116z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] tracking-wider uppercase text-purple-300 font-medium">
                      Get it on
                    </div>
                    <div className="text-sm font-bold tracking-tight text-white">
                      Google Play
                    </div>
                  </div>
                </a>

                {/* App Store Button (Coming Soon) */}
                <div className="inline-flex items-center gap-3 bg-purple-100/80 border border-purple-200 text-purple-950 px-5 py-3 rounded-2xl opacity-90 cursor-not-allowed">
                  <svg
                    className="w-7 h-7 text-purple-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.57-.69.96-1.65.86-2.61-.84.04-1.86.56-2.45 1.25-.53.61-1 1.58-.88 2.53.94.07 1.9-.48 2.47-1.17z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] tracking-wider uppercase text-purple-600 font-medium">
                      Download on
                    </div>
                    <div className="text-sm font-bold tracking-tight text-purple-950 flex items-center gap-1.5">
                      App Store{" "}
                      <span className="text-[9px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded font-semibold uppercase">
                        Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Scan feature note */}
            <div className="pt-2 flex items-center gap-3 text-xs text-purple-700/80 font-medium">
              <div className="w-8 h-8 rounded-xl bg-purple-200/60 flex items-center justify-center text-purple-900 shrink-0">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  ></path>
                </svg>
              </div>
              <div>
                <strong className="text-purple-950 font-semibold">
                  Instant Scan:
                </strong>{" "}
                Point camera to download app on scan. Open your camera to
                quickly access Play Store.
              </div>
            </div>
          </div>

          {/* Right Column: Visual / Mockup Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-br from-[#d4c4ed] to-[#b99ee0] rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-200/50 overflow-hidden text-purple-950">
              {/* Decorative background glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-300/40 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-950 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                    P
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase bg-white/60 px-3 py-1 rounded-full text-purple-950">
                    Live Transit
                  </span>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs text-purple-700 font-semibold uppercase tracking-wider">
                    <span>Active Route</span>
                    <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      Verified Driver
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-purple-950 flex items-center justify-between">
                    <span>Lagos</span>
                    <span className="text-purple-400 font-normal">➔</span>
                    <span>Abuja</span>
                  </div>
                  <div className="text-xs text-purple-800/80 pt-1 border-t border-purple-100 flex justify-between">
                    <span>Waybill Space Available</span>
                    <span className="font-bold text-purple-950">
                      ₦5,000 / pkg
                    </span>
                  </div>
                </div>

                {/* QR Code Scan Simulator Box */}
                <div className="bg-white rounded-2xl p-5 text-center shadow-sm flex flex-col items-center space-y-3">
                  <div className="w-28 h-28 bg-purple-50 rounded-xl p-2 border border-purple-100 flex items-center justify-center">
                    {/* SVG QR Code Simulation */}
                    <svg
                      className="w-full h-full text-purple-950"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2 2h8v8H2V2m2 2v4h4V4H4m10-2h8v8h-8V2m2 2v4h4V4h-4M2 14h8v8H2v-8m2 2v4h4v-4H4m13-3h3v3h-3v-3m-3 3h3v3h-3v-3m3 3h3v3h-3v-3m-6 0h3v3h-3v-3m0-3h3v3h-3v-3m6 6h3v3h-3v-3m-3 0h3v3h-3v-3Z" />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-purple-900">
                    Scan to download on Google Play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
