import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Mail, Code2, Terminal } from "lucide-react";

/* =========================================
   CONFIG
========================================= */

const ROLES = [
  "Full-Stack MERN Developer",
  "React Developer",
  "Node.js Backend Builder",
  "Problem Solver",
];

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const maskLine = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.1, ease: EASE } },
};


/* =========================================
   HOOK: TYPEWRITER
========================================= */

function useTypewriter(words, active) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? 35 : 70;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [active, words]);

  return text;
}


/* =========================================
   MAGNETIC WRAPPER (buttons follow cursor)
========================================= */

function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}


/* =========================================
   3D TILT CARD (follows mouse)
========================================= */

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), {
    stiffness: 160,
    damping: 18,
  });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* =========================================
   CODE WINDOW CONTENT
========================================= */

const G = ({ children }) => <span className="text-accent">{children}</span>;

const codeLines = [
  { indent: 0, content: <><span className="text-purple-400">const</span> developer = {"{"}</> },
  { indent: 1, content: <>name: <G>'Adil Abdullah'</G>,</> },
  { indent: 1, content: <>role: <G>'MERN Developer'</G>,</> },
  { indent: 1, content: <>skills: [</> },
  { indent: 2, content: <><G>'React'</G>,</> },
  { indent: 2, content: <><G>'Node.js'</G>,</> },
  { indent: 2, content: <><G>'MongoDB'</G></> },
  { indent: 1, content: <>],</> },
  { indent: 1, content: <>passion: <G>'Building'</G></> },
  { indent: 0, content: <>{"}"}</> },
];


/* =========================================
   HERO
========================================= */

function Hero({ ready = true }) {
  const sectionRef = useRef(null);
  const typed = useTypewriter(ROLES, ready);

  const state = ready ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden pb-28 pt-32"
    >
      {/* soft top spotlight */}
      <div className="spotlight pointer-events-none absolute inset-x-0 top-0 h-[70%]" />

      <div className="container relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* =========================================
            LEFT
        ========================================= */}

        <motion.div
          variants={container}
          initial="hidden"
          animate={state}
          className="min-w-0"
        >
          {/* availability badge */}
          <motion.div variants={fadeUp}>
            <div className="glass mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2.5">
              <span className="status-dot" />
              <span className="font-mono text-[0.72rem] text-ink-soft">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* typed role */}
          <motion.div variants={fadeUp} className="mb-6 min-h-[1.5em]">
            <span className="section-label caret uppercase">{typed}</span>
          </motion.div>

          {/* headline */}
          <h1 className="text-[clamp(2.2rem,9vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.06em] lg:text-[clamp(3rem,4.8vw,5.2rem)]">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" variants={maskLine}>
                Building modern
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span className="block" variants={maskLine}>
                web <span className="gradient-text">experiences.</span>
              </motion.span>
            </span>
          </h1>

          {/* description */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[520px] text-[1.02rem] leading-[1.9]"
          >
            Hi, I&apos;m Adil Abdullah. I build modern web applications using
            the MERN stack, combining clean interfaces with functional backend
            systems.
          </motion.p>

          {/* buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                Explore My Work
                <ArrowUpRight size={18} />
              </a>
            </Magnetic>

            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Get In Touch
              </a>
            </Magnetic>
          </motion.div>

          {/* socials */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://github.com/aaaedill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-[0.9rem] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-[#08090B]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.26 3.17 1.72.1-.72.39-1.2.71-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.14-2.97-.11-.28-.5-1.4.11-2.92 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.61 1.52.22 2.64.11 2.92.71.77 1.14 1.76 1.14 2.97 0 4.27-2.61 5.21-5.09 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/adil-abdullah-5a7482386"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-[0.9rem] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-[#08090B]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.1 18.9H5.2V9.6h2.9ZM6.65 8.33a1.68 1.68 0 1 1 .02-3.36 1.68 1.68 0 0 1-.02 3.36ZM18.9 18.9H16v-4.52c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.6h-2.9V9.6h2.78v1.27h.04a3.05 3.05 0 0 1 2.74-1.5c2.93 0 3.47 1.93 3.47 4.44Z" />
              </svg>
              LinkedIn
            </a>

            <a
              href="mailto:adilabd1313@gmail.com"
              aria-label="Email"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-[0.9rem] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-[#08090B]"
            >
              <Mail size={20} />
              Email
            </a>
          </motion.div>
        </motion.div>

        {/* =========================================
            RIGHT: CODE WINDOW
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={
            ready
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 40 }
          }
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="relative mx-auto flex w-full max-w-[520px] items-center justify-center"
        >
          {/* glow + rotating ring */}
          <div className="pointer-events-none absolute inset-[8%] rounded-full bg-accent opacity-[0.13] blur-[110px]" />
          <div className="pointer-events-none absolute inset-[-2%] animate-spin-slow rounded-full border border-dashed border-white/[0.07]" />
          <div className="pointer-events-none absolute inset-[10%] animate-spin-slow rounded-full border border-white/[0.05] [animation-direction:reverse]" />

          <TiltCard className="relative z-10 w-full max-w-[450px]">
            <div className="border-gradient overflow-hidden rounded-2xl bg-[#111318]/90 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7),0_0_60px_rgba(163,230,53,0.08)] backdrop-blur-xl">
              {/* header */}
              <div className="flex h-[52px] items-center justify-between border-b border-white/[0.07] bg-[#181B21] px-5">
                <div className="flex gap-2">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#EF4444]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#EAB308]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#22C55E]" />
                </div>
                <span className="font-mono text-xs text-ink-mute">
                  developer.js
                </span>
              </div>

              {/* code */}
              <div className="overflow-x-auto px-5 py-7 font-mono text-[0.72rem] leading-[2.1] text-[#E4E4E7] sm:px-6 sm:text-[0.85rem]">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                    transition={{ delay: 1 + i * 0.12, duration: 0.5, ease: EASE }}
                    className="flex whitespace-nowrap"
                  >
                    <span className="mr-5 w-4 shrink-0 select-none text-right text-ink-mute/50">
                      {i + 1}
                    </span>
                    <span style={{ paddingLeft: line.indent * 22 }}>
                      {line.content}
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={ready ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                  className="mt-3 flex whitespace-nowrap text-[0.72rem] text-ink-mute"
                >
                  <span className="mr-5 w-4 shrink-0" />
                  {"// Always learning. Always building."}
                  <span className="caret" />
                </motion.div>
              </div>
            </div>
          </TiltCard>

          {/* floating tags */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-2 top-[8%] z-20 flex items-center gap-2.5 rounded-xl px-4 py-3 text-[0.8rem] text-ink shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:-right-6"
          >
            <Code2 size={17} className="text-accent" />
            <span>Clean Code</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-2 bottom-[10%] z-20 flex items-center gap-2.5 rounded-xl px-4 py-3 text-[0.8rem] text-ink shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:-left-8"
          >
            <Terminal size={17} className="text-accent" />
            <span>Full Stack</span>
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================
          SCROLL INDICATOR
      ========================================= */}

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 font-mono text-[0.65rem] tracking-[0.14em] text-ink-mute transition-colors hover:text-accent md:flex"
      >
        <span className="flex h-9 w-[22px] justify-center rounded-full border border-white/20 pt-2 group-hover:border-accent">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </span>
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  );
}

export default Hero;