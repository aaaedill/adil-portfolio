import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { BriefcaseBusiness, X, Download, Award, Eye } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const certificateUrl = "/internship-certificate.png";


/* =========================================
   ANIMATION VARIANTS
========================================= */

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0, rotate: -120 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 180, damping: 14 },
  },
};

const maskUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: EASE } },
};

const slideIn = {
  hidden: { opacity: 0, x: 70, rotate: 5 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.1, ease: EASE } },
};

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const headingWords = [
  { t: "My" },
  { t: "professional" },
  { t: "journey.", accent: true },
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
   3D TILT (follows the mouse)
========================================= */

function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
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
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* =========================================
   CERTIFICATE POPUP
========================================= */

function CertificateModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="certificate-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Internship Certificate"
            initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
            style={{ transformPerspective: 1200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94svh] max-w-[min(96vw,1100px)] flex-col items-center gap-3 rounded-2xl border border-accent/20 bg-[#111318] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_80px_rgba(163,230,53,0.08)] sm:p-4"
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close certificate"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 14 }}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors duration-300 hover:rotate-90 hover:border-accent hover:text-accent"
            >
              <X size={20} />
            </motion.button>

            <motion.img
              src={certificateUrl}
              alt="Adil Abdullah Internship Certificate"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              className="block max-h-[calc(94svh-110px)] w-auto max-w-full rounded-lg object-contain"
            />

            <motion.a
              href={certificateUrl}
              download="Adil-Abdullah-Internship-Certificate.png"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              className="btn btn-primary w-full !py-3 !text-[0.85rem] sm:w-auto"
            >
              <Download size={16} />
              Download Certificate
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}


/* =========================================
   INTERNSHIP SECTION
========================================= */

function Internship() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="internship" className="section">
      <div className="container">
        <Reveal>
          <p className="section-label">04 / EXPERIENCE</p>
        </Reveal>

        {/* HEADING: word by word */}
        <motion.h2
          variants={headingContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 mt-6"
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

        {/* TIMELINE */}
        <div className="relative lg:pl-20">
          {/* line draws itself downward */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute bottom-0 left-[22px] top-0 hidden w-px origin-top bg-gradient-to-b from-accent via-white/10 to-transparent lg:block"
          />

          {/* node pops in and pulses */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 12 }}
            className="absolute left-[11px] top-12 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-[#08090B] shadow-[0_0_20px_rgba(163,230,53,0.5)] lg:flex"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </motion.div>

          {/* card */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div
              onMouseMove={onMove}
              className="card-premium p-6 sm:p-8 lg:p-10"
            >
              <motion.div
                variants={cardContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_320px] lg:gap-14"
              >
                {/* INFO */}
                <div className="min-w-0">
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <motion.span
                      variants={iconPop}
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent"
                    >
                      <BriefcaseBusiness size={25} />
                    </motion.span>

                    <motion.div
                      variants={rise}
                      className="flex flex-wrap items-center gap-3"
                    >
                      <span className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-accent">
                        INTERNSHIP
                      </span>
                      <span className="tag">
                        <Award size={13} />
                        Certified
                      </span>
                    </motion.div>
                  </div>

                  <h3 className="mb-5 text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold leading-[1.3] tracking-[-0.02em]">
                    <span className="block overflow-hidden pb-[0.1em]">
                      <motion.span variants={maskUp} className="block break-words">
                        CODEME HUB INTERNATIONAL PVT LTD
                      </motion.span>
                    </span>
                  </h3>

                  <motion.p
                    variants={rise}
                    className="mb-8 max-w-[640px] text-[0.95rem] leading-[1.9]"
                  >
                    Completed an internship at CODEME HUB INTERNATIONAL PVT LTD,
                    gaining professional exposure and an opportunity to develop
                    my knowledge in software development. The internship is
                    supported by a certificate.
                  </motion.p>

                  <motion.div variants={rise}>
                    <button
                      type="button"
                      onClick={() => setShowCertificate(true)}
                      className="btn btn-primary"
                    >
                      <Eye size={18} />
                      View Certificate
                    </button>
                  </motion.div>
                </div>

                {/* CERTIFICATE THUMBNAIL: slides in, floats, tilts */}
                <motion.div variants={slideIn}>
                  <motion.div
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Tilt>
                      <button
                        type="button"
                        onClick={() => setShowCertificate(true)}
                        aria-label="Open internship certificate"
                        className="group/thumb relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0D0F13] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-colors duration-500 hover:border-accent/60"
                      >
                        {imageFailed ? (
                          <span className="flex h-full w-full items-center justify-center text-accent/60">
                            <Award size={56} />
                          </span>
                        ) : (
                          <img
                            src={certificateUrl}
                            alt=""
                            loading="lazy"
                            onError={() => setImageFailed(true)}
                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/thumb:scale-105"
                          />
                        )}

                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/thumb:opacity-100">
                          <span className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-heading text-[0.85rem] font-semibold text-[#08090B]">
                            <Eye size={16} />
                            View
                          </span>
                        </span>
                      </button>
                    </Tilt>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <CertificateModal
        open={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
    </section>
  );
}

export default Internship;