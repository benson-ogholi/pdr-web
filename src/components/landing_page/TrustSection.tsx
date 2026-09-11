import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Clock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Verified community",
    desc: "Every driver and passenger is vetted for safety and security.",
  },
  {
    icon: Target,
    title: "Precision matching",
    desc: "Routes are matched automatically so trips connect the fastest, most efficient way.",
  },
  {
    icon: Users,
    title: "Community first",
    desc: "Building a network that benefits the traveler, not just the platform.",
  },
  {
    icon: Clock,
    title: "Always available",
    desc: "Logistics that move at the speed of your life, 24/7.",
  },
];

export const TrustSection = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 max-w-2xl sm:mb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7F6F2] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
            <span className="text-[13px] font-medium text-[#161B22]/70">
              Why Padiman
            </span>
          </div>
          <h2 className="text-[36px] font-semibold leading-[1.15] tracking-tight text-[#161B22] sm:text-[46px]">
            Travel built on trust and efficiency.
          </h2>
        </div>

        {/* Pillars — kept borderless/editorial, recolored to the brand */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-start"
              >
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-[#6D28D9]/10">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#6D28D9]"
                  />
                </div>
                <h3 className="mb-3 text-[17px] font-semibold tracking-tight text-[#161B22]">
                  {pillar.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#161B22]/55">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
