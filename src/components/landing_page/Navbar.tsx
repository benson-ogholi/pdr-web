import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.padimanroute.app";

const NAV_LINKS = [
  { to: "/faq", label: "FAQ" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled
          ? "shadow-[0_1px_0_rgba(22,27,34,0.08),0_8px_24px_-16px_rgba(22,27,34,0.15)]"
          : "border-b border-[#161B22]/[0.06]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[76px] flex items-center justify-between">
        {/* Logo mark */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6D28D9] text-[14px] font-semibold text-white">
            P
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-[#161B22]">
            PadimanRoute
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[14.5px] font-medium text-[#161B22]/65 hover:text-[#161B22] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#6D28D9] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#5B21B6] transition-colors"
          >
            Get started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-[#161B22] hover:bg-[#161B22]/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute w-full bg-white border-b border-[#161B22]/[0.06] shadow-[0_16px_40px_-16px_rgba(22,27,34,0.2)]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-[#161B22] hover:bg-[#F7F6F2] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
                  {link.label}
                </Link>
              ))}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full rounded-full bg-[#6D28D9] py-3.5 text-center text-[15px] font-medium text-white hover:bg-[#5B21B6] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
