import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

function Navbar({ ready = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // =========================================
  // SMOOTH SECTION SCROLLING (all #links)
  // =========================================

  useEffect(() => {
    const handleAnchorNavigation = (event) => {
      const el =
        event.target instanceof Element
          ? event.target
          : event.target.parentElement;
      if (!el) return;

      const anchor = el.closest("a[href^='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = decodeURIComponent(href.substring(1));
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();

      const top = window.scrollY + target.getBoundingClientRect().top;

      if (window.location.hash !== `#${targetId}`) {
        window.history.pushState(null, "", `#${targetId}`);
      }

      window.scrollTo({
        top: Math.max(0, top),
        left: 0,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", handleAnchorNavigation);
    return () => document.removeEventListener("click", handleAnchorNavigation);
  }, []);

  // =========================================
  // ACTIVE SECTION + SCROLLED STATE
  // =========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "home";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 160) {
          current = item.id;
        }
      });

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (atBottom) current = "contact";

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // =========================================
  // ESCAPE KEY + LOCK BODY SCROLL WHEN OPEN
  // =========================================

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 md:pt-5">
      {/* =========================================
          FLOATING GLASS PILL
      ========================================= */}

      <motion.div
        ref={navRef}
        initial={{ y: -120, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -120, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto relative z-[110] flex w-full items-center justify-between rounded-full px-3 py-2.5 pl-6 transition-all duration-500 md:px-3 ${
          scrolled
            ? "glass-nav max-w-[880px]"
            : "max-w-[1100px] border border-transparent bg-transparent"
        }`}
      >
        {/* LOGO */}
        <a
          href="#home"
          onClick={closeMenu}
          className="font-heading text-[1.6rem] font-bold leading-none tracking-[-0.08em] text-ink"
        >
          AD<span className="text-accent">.</span>
        </a>

        {/* DESKTOP LINKS */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.85rem] transition-colors duration-300 ${
                  active ? "text-[#08090B]" : "text-ink-soft hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={closeMenu}
            className="btn btn-ghost hidden py-2.5! px-5! text-[0.85rem]! sm:inline-flex"
          >
            Let&apos;s Talk
            <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* =========================================
          MOBILE FULL-SCREEN MENU
      ========================================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-auto fixed inset-0 z-[105] flex flex-col overflow-y-auto bg-[#08090B]/97 px-8 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <div className="aurora">
              <div
                className="aurora-blob lime"
                style={{ width: 420, height: 420, top: "10%", right: "-20%" }}
              />
            </div>

            <div className="my-auto">
            <ul className="relative z-10 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const active = activeSection === item.id;

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.25 + i * 0.07,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={closeMenu}
                      className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4"
                    >
                      <span className="font-mono text-xs text-accent">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-heading text-[2rem] font-semibold tracking-tight transition-colors sm:text-[2.4rem] ${
                          active
                            ? "text-accent"
                            : "text-ink group-hover:text-accent"
                        }`}
                      >
                        {item.name}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <motion.a
              href="#contact"
              onClick={closeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="btn btn-primary relative z-10 mt-10 self-start"
            >
              Let&apos;s Talk
              <ArrowUpRight size={18} />
            </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;