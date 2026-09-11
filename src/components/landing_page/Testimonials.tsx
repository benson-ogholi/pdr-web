import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  initial: string;
  name: string;
  role: string;
  route: string;
  rating: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I fly Lagos to London every other month anyway. Now I make the trip pay for itself and someone's package actually arrives on time.",
    initial: "C",
    name: "Chidinma A.",
    role: "Verified traveler",
    route: "Lagos → Warri",
    rating: "5.0 ★",
  },
  {
    quote:
      "I stopped trying to explain 'fragile' to a courier warehouse. My traveler carried it personally and messaged me the second it landed.",
    initial: "T",
    name: "Tunde O.",
    role: "Sender",
    route: "Port Harcourt → Abuja",
    rating: "5.0 ★",
  },
  {
    quote:
      "The tracking is the part that sold me. I watched the handover happen in real time and knew exactly when to expect it.",
    initial: "I",
    name: "Ijeoma K.",
    role: "Sender",
    route: "Abuja → Enugu",
    rating: "5.0 ★",
  },
  {
    quote:
      "Sent heavy legal documents via a verified lawyer traveling same day from Lagos to PH. Got delivered in hours instead of days of sorting center delays.",
    initial: "E",
    name: "Emeka E.",
    role: "Sender",
    route: "Lagos → Port Harcourt",
    rating: "5.0 ★",
  },
  {
    quote:
      "Sharing my empty backseat on a trip from Ibadan to Benin paid for my fuel and tolls completely. Safe app, real people.",
    initial: "K",
    name: "Kemi B.",
    role: "Verified Driver / Traveler",
    route: "Ibadan → Benin",
    rating: "4.9 ★",
  },
  {
    quote:
      "Absolute game changer for sending authentic foodstuff to my brother in diaspora without customs drama or extortionate logistics fees.",
    initial: "O",
    name: "Ogechi N.",
    role: "Sender",
    route: "Abuja → Port Harcourt",
    rating: "5.0 ★",
  },
];

export const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? 400 : 300;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#000] text-white py-24 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background ambient lighting effect, tied to the brand purple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D28D9]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
              <span className="text-[13px] font-medium text-white/70">
                Voices from the network
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              People trust travelers with <br />
              <span className="text-[#B794F4]">their parcels & rides.</span>
            </h2>
          </div>

          {/* Scroll Control Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 rounded-3xl p-8 flex flex-col justify-between transition duration-300 min-w-[320px] sm:min-w-[380px] max-w-[400px] snap-start flex-shrink-0"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-400 text-sm tracking-widest font-bold">
                    {item.rating}
                  </div>
                  <span className="text-xs font-semibold text-[#B794F4] bg-[#6D28D9]/15 px-2.5 py-1 rounded-full border border-[#6D28D9]/25">
                    {item.route}
                  </span>
                </div>

                <p className="text-white/75 text-sm sm:text-base leading-relaxed not-italic overflow-hidden">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-[#6D28D9] text-white font-extrabold flex items-center justify-center text-base shadow-inner">
                  {item.initial}
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base tracking-tight">
                    {item.name}
                  </div>
                  <div className="text-xs text-white/50 font-medium">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
