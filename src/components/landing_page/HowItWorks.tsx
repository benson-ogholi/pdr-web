import React from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.padimanroute.app";

interface WorkflowStep {
  step: string;
  badge: string;
  title: string;
  description: string;
  highlightText: string;
  bgClass: string;
  textColor: string;
  badgeBgClass: string;
  imageSrc: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    step: "Step 01 of 03",
    badge: "Initiation",
    title: "Post your trip or parcel",
    description:
      "Share your route details and cargo needs effortlessly with a clean mobile interface designed for quick bookings.",
    highlightText: "Explore flow →",
    bgClass: "bg-white border border-purple-100 shadow-sm",
    textColor: "text-purple-950",
    badgeBgClass: "bg-purple-950/10 text-purple-900",
    imageSrc:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    step: "Step 02 of 03",
    badge: "Algorithm",
    title: "Smart Matching",
    description:
      "Our automated system instantly pairs senders with verified travelers heading the exact same interstate way.",
    highlightText: "Explore flow →",
    bgClass: "bg-purple-950 text-white shadow-lg",
    textColor: "text-white",
    badgeBgClass: "bg-white/20 text-white",
    imageSrc:
      "https://images.unsplash.com/photo-1572401611152-cf63d874b019?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZCUyMHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    step: "Step 03 of 03",
    badge: "Fulfillment",
    title: "Track & Complete",
    description:
      "Follow the journey securely and finalize delivery with total transparency and peace of mind across Nigeria.",
    highlightText: "Explore flow →",
    bgClass: "bg-[#b99ee045]",
    textColor: "text-purple-950",
    badgeBgClass: "bg-purple-950/10 text-purple-900",
    imageSrc:
      "https://images.unsplash.com/photo-1619741982598-7cb8a7959476?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const IntelligentWorkflow: React.FC = () => {
  return (
    <section className="bg-[#f5f3fa] text-purple-950 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase border border-purple-200/60">
            The Intelligent Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-purple-950 mb-6 leading-tight">
            All you need to make
            <br />
            <span className="text-purple-600">
              Your travelling generate Income
            </span>
          </h2>
          <p className="text-purple-700/80 text-base sm:text-lg max-w-2xl mx-auto">
            Built for modern commuters and senders. Designed for seamless,
            frictionless mobility across Nigeria.
          </p>
        </div>

        {/* Workflow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {workflowSteps.map((item, index) => {
            const isDark = index === 1;
            return (
              <div
                key={index}
                className={`${item.bgClass} rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition transform hover:-translate-y-1 duration-300 min-h-[460px]`}
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${item.badgeBgClass}`}
                    >
                      {item.badge}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isDark ? "text-purple-300" : "text-purple-700"
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-extrabold ${item.textColor} tracking-tight`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? "text-purple-200" : "text-purple-900/80"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Card Image Thumbnail */}
                <div className="my-6 relative h-40 rounded-2xl overflow-hidden shadow-inner group">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark ? "bg-purple-950/30" : "bg-purple-950/10"
                    } mix-blend-multiply`}
                  ></div>
                </div>

                {/* Footer: now a real link to the Play Store */}
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pt-4 flex items-center justify-between border-t relative z-10 group ${
                    isDark ? "border-white/10" : "border-purple-950/10"
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${item.textColor} flex items-center gap-1`}
                  >
                    {item.highlightText}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isDark
                        ? "bg-white/10 text-white"
                        : "bg-purple-950/10 text-purple-950"
                    }`}
                  >
                    ↗
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntelligentWorkflow;
