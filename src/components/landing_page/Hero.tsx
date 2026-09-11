import { useEffect, useRef } from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Apple, 
  Play,
  CheckCircle2
} from "lucide-react";
import QRCode from "react-qr-code";
import gsap from "gsap";
import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background glow ambient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#9C2583]/10 via-[#9C2583]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#9C2583] animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-slate-700">
                Nigeria's Trusted Peer Transit Network
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08] mb-6">
              Send packages <br className="hidden sm:inline" />
              with <span className="text-[#9C2583]">travelers</span> you <br className="hidden sm:inline" />
              can trust.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-10">
              Skip traditional courier delays and high fees. PadimanRoute connects you with verified daily travelers heading straight to your package's destination.
            </p>

            {/* Action Buttons & QR Box Container */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
              
              {/* Play Store & App Store Buttons */}
              <div className="flex flex-col gap-3.5 w-full sm:w-auto">
                <a
                  href="https://play.google.com/store/apps/details?id=com.padimanroute.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-950 hover:bg-[#9C2583] text-white shadow-xl shadow-slate-950/15 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play size={18} className="fill-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-white/80 font-medium">
                      Get it on
                    </div>
                    <div className="text-sm font-bold tracking-tight">
                      Google Play
                    </div>
                  </div>
                  <ArrowRight size={18} className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>

                {/* App Store (Coming Soon) */}
                <div className="flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-400 cursor-not-allowed">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                    <Apple size={18} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Download on
                    </div>
                    <div className="text-sm font-bold text-slate-600 tracking-tight">
                      App Store
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9C2583]/10 text-[#9C2583] border border-[#9C2583]/20">
                    Soon
                  </span>
                </div>
              </div>

              {/* Vertical Divider (Hidden on small mobile) */}
              <div className="hidden xl:flex items-center gap-4 text-slate-300">
                <div className="w-[1px] h-24 bg-slate-200" />
              </div>

              {/* Functional QR Code Card */}
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
                <a
                  href="https://play.google.com/store/apps/details?id=com.padimanroute.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0"
                  aria-label="Scan to download Padiman"
                >
                  <div className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] bg-white rounded-2xl border-2 border-slate-900 p-2.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <QRCode
                      value="https://play.google.com/store/apps/details?id=com.padimanroute.app"
                      size={110}
                      bgColor="#ffffff"
                      fgColor="#0f172a"
                      level="H"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  {/* Scan line animation overlay */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9C2583] to-transparent animate-[scan_2.5s_ease-in-out_infinite]" />
                  </div>
                </a>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9C2583] mb-1">
                    Instant Scan
                  </span>
                  <p className="text-xs font-semibold text-slate-900 leading-snug max-w-[110px]">
                    Point camera to download app
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gradient border frame */}
              <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-tr from-[#9C2583] to-slate-300 opacity-30 blur-md pointer-events-none" />
              
              {/* Main Image Container */}
              <div className="relative rounded-[28px] overflow-hidden border border-slate-200 shadow-2xl bg-slate-900">
                <img
                  src={heroImage}
                  alt="PadimanRoute Package Delivery Experience"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Live Badge inside image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#9C2583] flex items-center justify-center text-white flex-shrink-0">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-950">Active Transit Corridor</p>
                    <p className="text-[11px] text-slate-500 font-medium">Lagos ⇄ Abuja ⇄ Port Harcourt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Cards - Redesigned as an Interconnected Horizontal Workflow Grid */}
        <div className="mt-24 pt-12 border-t border-slate-100">
          
          {/* Section Subheader */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#9C2583] uppercase mb-2 block">
                The Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Designed for speed, safety, and scale
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-sm mt-2 md:mt-0">
              Built from the ground up to replace legacy bottlenecks with human trust and direct routes.
            </p>
          </div>

          {/* Workflow Cards Layout */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <ShieldCheck size={26} strokeWidth={1.8} />,
                title: "ID-Verified Users",
                text: "Every sender and traveler is identity-checked for maximum safety and trust.",
                badge: "Verified Trust"
              },
              {
                step: "02",
                icon: <Zap size={26} strokeWidth={1.8} />,
                title: "Door-to-Door Speed",
                text: "Skip park queues and warehouses. Your package travels directly with people.",
                badge: "Zero Queues"
              },
              {
                step: "03",
                icon: <Globe size={26} strokeWidth={1.8} />,
                title: "Nationwide Routes",
                text: "Connecting major cities and transit corridors across Nigeria every day.",
                badge: "Pan-Nigeria"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between p-8 rounded-[32px] bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-[#9C2583]/40 hover:shadow-2xl hover:shadow-[#9C2583]/10 transition-all duration-500 overflow-hidden"
              >
                {/* Background subtle watermark step number */}
                <span className="absolute right-4 bottom-2 text-7xl font-black text-slate-200/50 group-hover:text-[#9C2583]/10 transition-colors duration-500 select-none pointer-events-none">
                  {item.step}
                </span>

                <div>
                  {/* Top Bar: Icon + Step Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#9C2583] group-hover:bg-[#9C2583] group-hover:text-white group-hover:border-[#9C2583] group-hover:scale-110 transition-all duration-400 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-white border border-slate-200/60 text-slate-700 group-hover:border-[#9C2583]/30 group-hover:text-[#9C2583] transition-colors duration-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-950 mb-3 tracking-tight group-hover:text-[#9C2583] transition-colors duration-300 flex items-center gap-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-slate-600 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>

                {/* Bottom Interactive Indicator */}
                <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#9C2583] transition-colors duration-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> Active protocol
                  </span>
                  <span className="transform translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}