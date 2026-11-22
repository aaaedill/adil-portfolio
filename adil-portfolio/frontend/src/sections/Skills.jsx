import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Globe,
  Terminal,
  Database,
  Layers,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
];

const categories = [
  { icon: Globe, title: "Frontend", text: "HTML, CSS, JavaScript, React" },
  { icon: Terminal, title: "Backend", text: "Node.js, Express.js" },
  { icon: Database, title: "Database", text: "MongoDB" },
  { icon: Layers, title: "Development", text: "Full-Stack Application Development" },
];


/* =========================================
   REVEAL WRAPPER
========================================= */

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* =========================================
   INFINITE MARQUEE ROW
========================================= */

function MarqueeRow({ reverse = false, outline = false }) {
  // repeat the list so one group is always wider than the screen
  const items = [...skills, ...skills];

  const group = (
    <div className="flex shrink-0 items-center gap-4 pr-4">
      {items.map((skill, i) => (
        <span
          key={`${skill}-${i}`}
          className={`flex items-center gap-4 whitespace-nowrap rounded-full border px-7 py-3.5 font-heading text-[1.15rem] font-medium tracking-tight ${
            outline
              ? "border-white/10 bg-transparent text-ink-soft"
              : "border-white/10 bg-white/[0.04] text-ink"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
          {skill}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div
        className={`flex w-max hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {group}
        {group}
      </div>
    </div>
  );
}


/* =========================================
   SKILL ROW
========================================= */

function SkillRow({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: EASE }}
      className="group relative flex min-h-[90px] items-center gap-4 overflow-hidden border-b border-white/[0.08] px-4 py-5 sm:min-h-[100px] sm:gap-6 sm:px-6 sm:py-6 md:odd:border-r"
    >
      {/* hover fill */}
      <span className="absolute inset-0 translate-y-full bg-accent/[0.08] transition-transform duration-500 ease-out group-hover:translate-y-0" />

      <span className="relative z-10 shrink-0 font-mono text-xs text-ink-mute transition-colors duration-300 group-hover:text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative z-10 flex-1 font-heading text-[1.25rem] font-medium tracking-tight text-ink transition-transform sm:text-[1.5rem] duration-500 ease-out group-hover:translate-x-2">
        {skill}
      </span>

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-mute transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-[#08090B]">
        <ArrowUpRight size={18} />
      </span>
    </motion.div>
  );
}


/* =========================================
   CATEGORY CARD
========================================= */

function CategoryCard({ icon: Icon, title, text, index }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE }}
    >
      <div onMouseMove={onMove} className="card-premium h-full min-h-[180px] p-7">
        <div className="relative z-10 flex h-full flex-col gap-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
            <Icon size={22} />
          </span>

          <div>
            <h3 className="mb-2 text-[1.1rem] font-semibold">{title}</h3>
            <p className="text-[0.85rem] leading-[1.7] text-ink-mute">{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* =========================================
   SKILLS SECTION
========================================= */

function Skills() {
  return (
    <section
      id="skills"
      className="section border-y border-white/[0.05] bg-[#0D0F13]/60 backdrop-blur-[2px]"
    >
      <div className="container">
        <Reveal>
          <p className="section-label">02 / TECHNICAL SKILLS</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-[750px]">
            Technologies I <span className="gradient-text">work with.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-[550px] text-base leading-[1.8]">
            Technologies and tools I&apos;m familiar with and use while
            building projects, developing applications, and improving my
            full-stack development skills.
          </p>
        </Reveal>
      </div>

      {/* MARQUEE (full width) */}
      <Reveal delay={0.2} className="mt-16 flex flex-col gap-4">
        <MarqueeRow />
        <MarqueeRow reverse outline />
      </Reveal>

      <div className="container">
        {/* SKILLS GRID */}
        <div className="mt-16 grid border-t border-white/[0.08] md:grid-cols-2">
          {skills.map((skill, i) => (
            <SkillRow key={skill} skill={skill} index={i} />
          ))}
        </div>

        {/* CATEGORIES */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <CategoryCard key={c.title} index={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;