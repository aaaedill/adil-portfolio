import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Code2, Server, Database } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* =========================================
   HEADING (word-by-word reveal)
========================================= */

const headingWords = [
  { t: "A" },
  { t: "developer" },
  { t: "focused" },
  { t: "on" },
  { t: "building", accent: true },
  { t: "things", accent: true },
  { t: "that" },
  { t: "matter." },
];

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};


/* =========================================
   REVEAL WRAPPER (fade up on scroll)
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
   SKILL HIGHLIGHT CARDS
========================================= */

const highlights = [
  {
    icon: Code2,
    title: "Frontend",
    text: "Building clean, responsive and intuitive interfaces with React.",
    tags: ["React", "JavaScript", "Tailwind"],
  },
  {
    icon: Server,
    title: "Backend",
    text: "Creating functional APIs and server logic with Node.js and Express.js.",
    tags: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    icon: Database,
    title: "Database",
    text: "Designing and managing data for full-stack apps with MongoDB.",
    tags: ["MongoDB", "Mongoose", "Data modelling"],
  },
];

function HighlightCard({ icon: Icon, title, text, tags, index }) {
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
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
    >
      <div onMouseMove={onMove} className="card-premium h-full p-6 lg:p-8">
        <div className="relative z-10">
          <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
            <Icon size={22} />
          </span>

          <h3 className="mb-3">{title}</h3>

          <p className="text-[0.95rem] leading-[1.8]">{text}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* =========================================
   ABOUT SECTION
========================================= */

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <p className="section-label">01 / ABOUT ME</p>
        </Reveal>

        <div className="mt-12 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* HEADING */}
          <div className="lg:sticky lg:top-32">
            <motion.h2
              variants={headingContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-[580px] text-[clamp(2.5rem,4.5vw,4.2rem)] font-semibold leading-[1.12] tracking-[-0.055em]"
            >
              {headingWords.map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span
                    variants={wordVariant}
                    className={`inline-block ${w.accent ? "gradient-text" : ""}`}
                  >
                    {w.t}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>

          {/* DESCRIPTION */}
          <div className="max-w-[560px] pt-2">
            <Reveal delay={0.1}>
              <p className="mb-6 text-base leading-[1.9]">
                I&apos;m Adil Abdullah, a Full-Stack MERN Developer with a
                background in Software Development. I enjoy turning ideas
                into practical web applications and creating digital
                experiences that are both useful and intuitive.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mb-6 text-base leading-[1.9]">
                I work with React, Node.js, Express.js, and MongoDB to build
                full-stack applications. Through personal projects and
                hands-on learning, I&apos;m continuously strengthening my
                development skills and exploring better ways to solve
                problems.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mb-8 text-base leading-[1.9]">
                I&apos;m currently looking forward to opportunities where I
                can apply my knowledge, learn from experienced developers,
                and grow as a developer.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-[0.95rem] font-semibold text-accent"
              >
                <span className="relative">
                  Let&apos;s work together
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 transition-all duration-300 group-hover:bg-accent group-hover:text-[#08090B]">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {highlights.map((h, i) => (
            <HighlightCard key={h.title} index={i} {...h} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;