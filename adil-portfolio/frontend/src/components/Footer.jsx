import React from "react";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

/* ==========================================
   EDIT THESE: your real links
========================================== */

const EMAIL = "adilabd1313@gmail.com";

const socials = [
  { name: "GitHub", href: "https://github.com/aaaedill" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/adil-abdullah-5a7482386" },
  { name: "Email", href: `mailto:${EMAIL}` },
];

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#08090B]/80 backdrop-blur-sm">
      {/* top glow */}
      <div className="spotlight pointer-events-none absolute inset-x-0 top-0 h-72" />

      <div className="container relative z-10 pt-20">
        {/* =========================================
            LINK COLUMNS
        ========================================= */}

        <div className="grid gap-12 pb-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <a
              href="#home"
              className="font-heading text-[2rem] font-bold leading-none tracking-[-0.08em] text-ink"
            >
              AD<span className="text-accent">.</span>
            </a>

            <p className="mt-5 max-w-xs text-[0.92rem]">
              Full-stack MERN developer crafting fast, polished and
              user-focused web experiences.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="status-dot" />
              <span className="font-mono text-xs text-ink-soft">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* navigation */}
          <div>
            <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-mute">
              Navigate
            </h3>

            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[0.92rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* socials */}
          <div>
            <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-mute">
              Connect
            </h3>

            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.92rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.name}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* mail */}
          <div>
            <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-mute">
              Say hello
            </h3>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 break-all text-[0.92rem] text-ink-soft transition-colors hover:text-accent"
            >
              <Mail size={16} className="shrink-0" />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          GIANT OUTLINED NAME
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 mt-16 select-none overflow-hidden text-center"
      >
        <p className="text-outline whitespace-nowrap font-heading text-[clamp(2rem,10.5vw,12rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em]">
          Adil Abdullah
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08090B] to-transparent" />
      </div>

      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="container relative z-10 pb-8">
        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="text-[0.8rem] text-ink-mute">
            © {new Date().getFullYear()} Adil Abdullah. All rights reserved.
          </p>

          <span className="font-mono text-[0.65rem] tracking-[0.12em] text-ink-mute">
            DESIGNED &amp; BUILT WITH REACT + MOTION
          </span>

          <a
            href="#home"
            className="group inline-flex items-center gap-3 text-[0.85rem] text-ink-soft transition-colors hover:text-accent"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-[#08090B]">
              <ArrowUp size={16} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;