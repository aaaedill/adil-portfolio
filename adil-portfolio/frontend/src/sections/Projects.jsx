
import React from "react";
import { motion } from "motion/react";
import { Code2, ExternalLink, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* =========================================
   YOUR PROJECTS
   - code  : GitHub repo link (leave "" to hide button)
   - live  : deployed site link (leave "" to hide button)
   - image : screenshot path e.g. "/projects/fashion.png"
             (put the file in the /public folder).
             Leave "" to show the stylised preview instead.
========================================= */

const projects = [
  {
    number: "01",
    category: "FULL-STACK MERN APPLICATION",
    title: "Fashion E-Commerce Website",
    description:
      "A full-stack fashion e-commerce application featuring product browsing, authentication, cart, wishlist, order management, and an admin dashboard.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    code: "",
    live: "",
    image: "/projects/fashion-website.png",
  },
  {
    number: "02",
    category: "FRONTEND DEVELOPMENT",
    title: "Personal Developer Portfolio",
    description:
      "A personal developer portfolio designed to showcase my technical skills, projects, education, and development journey.",
    technologies: ["React", "CSS", "JavaScript"],
    code: "",
    live: "",
    image: "",
  },
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
   PROJECT PREVIEW (screenshot or stylised)
========================================= */

function Preview({ project }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0D0F13] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">

      {/* browser bar */}
      <div className="relative z-20 flex h-9 items-center gap-3 border-b border-white/[0.07] bg-[#181B21] px-4">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <span className="h-2 w-2 rounded-full bg-[#EAB308]" />
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
        </div>

        <div className="mx-auto hidden h-5 w-1/2 items-center justify-center rounded-full bg-white/[0.05] font-mono text-[0.6rem] text-ink-mute sm:flex">
          {project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.app
        </div>
      </div>

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.04]">

        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <>
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/30 blur-[70px]" />

            <div className="absolute -bottom-12 right-0 h-48 w-56 rounded-full bg-accent-deep/30 blur-[80px]" />

            <div className="absolute inset-0 grid-background opacity-60" />

            <span className="text-outline absolute right-5 top-3 font-heading text-[clamp(3.5rem,9vw,6rem)] font-bold leading-none tracking-tighter">
              {project.number}
            </span>

            <div className="absolute inset-x-6 bottom-6 space-y-3 sm:inset-x-8 sm:bottom-8">
              <div className="h-3 w-2/5 rounded-full bg-accent/70" />

              <div className="h-2 w-3/4 rounded-full bg-white/15" />

              <div className="h-2 w-1/2 rounded-full bg-white/10" />

              <div className="flex gap-2 pt-2">
                <div className="h-7 w-20 rounded-full bg-accent" />

                <div className="h-7 w-16 rounded-full border border-white/20" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


/* =========================================
   PROJECT CARD
========================================= */

function ProjectCard({ project, index }) {
  const flip = index % 2 === 1;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--mx",
      `${e.clientX - r.left}px`
    );

    e.currentTarget.style.setProperty(
      "--my",
      `${e.clientY - r.top}px`
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div
        onMouseMove={onMove}
        className="card-premium group p-5 sm:p-8 lg:p-10"
      >
        <div className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">

          {/* INFO */}
          <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>

            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-base font-medium text-accent">
                {project.number}
              </span>

              <span className="h-px w-8 bg-accent/40" />

              <span className="font-mono text-[0.66rem] font-medium tracking-[0.1em] text-accent sm:text-[0.7rem]">
                {project.category}
              </span>
            </div>

            <h3 className="mb-4 text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.04em] transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>

            <p className="mb-7 max-w-[560px] text-[0.92rem] leading-[1.9]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>

            {(project.live || project.code) && (
              <div className="mt-8 flex flex-wrap gap-3">

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live preview of ${project.title}`}
                    className="btn btn-primary"
                  >
                    Live Demo
                    <ExternalLink size={17} />
                  </a>
                )}

                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Code repository for ${project.title}`}
                    className="btn btn-ghost"
                  >
                    <Code2 size={17} />
                    Source Code
                  </a>
                )}

              </div>
            )}

          </div>

          {/* VISUAL */}
          <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
            <Preview project={project} />
          </div>

        </div>
      </div>
    </motion.article>
  );
}


/* =========================================
   PROJECTS SECTION
========================================= */

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">

        <Reveal>
          <p className="section-label">03 / SELECTED PROJECTS</p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
        >
          <h2 className="max-w-[750px]">
            Things I&apos;ve <span className="gradient-text">built.</span>
          </h2>

          <span className="whitespace-nowrap pb-2 font-mono text-[0.72rem] tracking-[0.1em] text-ink-mute">
            {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
            />
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a
            href="https://github.com/aaaedill"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-accent"
          >
            More on my GitHub

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-[#08090B]">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}

export default Projects;
