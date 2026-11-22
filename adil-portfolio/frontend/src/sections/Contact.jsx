import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const EMAIL = "adilabd1313@gmail.com";
const MAX_MESSAGE = 3000;

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const maskLine = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.1, ease: EASE } },
};

const statusStyles = {
  success: "border-accent/30 bg-accent/10 text-accent",
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  error: "border-red-400/30 bg-red-400/10 text-red-300",
};


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
   CONTACT SECTION
========================================= */

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [copied, setCopied] = useState(false);

  /* ---------- copy email ---------- */

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  /* ---------- submit (same logic as before) ---------- */

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = `Portfolio enquiry from ${name}`;

    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType("");

    try {
      const API_URL = `${
        import.meta.env.VITE_API_URL || "http://localhost:5000/api"
      }/contact`;

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your message. Please try again."
        );
      }

      setStatusType(data.emailSent ? "success" : "warning");
      setStatusMessage(data.message);

      form.reset();
      setMessageLength(0);
    } catch (error) {
      console.error("Contact form error:", error);

      setStatusType("error");

      setStatusMessage(
        error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* glow blobs */}
      <div className="aurora">
        <div
          className="aurora-blob lime"
          style={{ width: 520, height: 520, top: "5%", right: "-12%" }}
        />
        <div
          className="aurora-blob deep"
          style={{ width: 420, height: 420, bottom: "-10%", left: "-10%" }}
        />
      </div>

      <div className="container relative z-10">
        <Reveal>
          <p className="section-label">06 / GET IN TOUCH</p>
        </Reveal>

        <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* =========================================
              LEFT
          ========================================= */}

          <div className="min-w-0">
            <motion.h2
              variants={headingContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mb-7 text-[clamp(2.6rem,6.5vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.055em]"
            >
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span className="block" variants={maskLine}>
                  Have a project
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.14em]">
                <motion.span className="block" variants={maskLine}>
                  in <span className="gradient-text">mind?</span>
                </motion.span>
              </span>
            </motion.h2>

            <Reveal delay={0.15}>
              <p className="mb-9 max-w-[450px] text-[0.95rem] leading-[1.9]">
                I&apos;m always interested in learning, collaborating, and
                exploring new opportunities. Feel free to send me a message.
              </p>
            </Reveal>

            {/* email card */}
            <Reveal delay={0.25}>
              <div className="glass flex max-w-[480px] items-center gap-4 rounded-2xl p-3 pr-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex min-w-0 flex-1 items-center gap-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-[#08090B]">
                    <Mail size={20} />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-mute">
                      Email me
                    </span>
                    <span className="block break-all text-[0.95rem] text-ink transition-colors group-hover:text-accent">
                      {EMAIL}
                    </span>
                  </span>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-soft transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        className="text-accent"
                      >
                        <Check size={17} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy size={17} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </Reveal>

            {/* social links */}
            <Reveal delay={0.35} className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/aaaedill"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-[0.9rem] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-[#08090B]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
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
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-[0.9rem] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-[#08090B]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.1 18.9H5.2V9.6h2.9ZM6.65 8.33a1.68 1.68 0 1 1 .02-3.36 1.68 1.68 0 0 1-.02 3.36ZM18.9 18.9H16v-4.52c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.6h-2.9V9.6h2.78v1.27h.04a3.05 3.05 0 0 1 2.74-1.5c2.93 0 3.47 1.93 3.47 4.44Z" />
                </svg>
                LinkedIn
              </a>
            </Reveal>
          </div>

          {/* =========================================
              FORM
          ========================================= */}

          <Reveal delay={0.2} className="min-w-0">
            <form
              onSubmit={handleContactSubmit}
              className="glass border-gradient rounded-3xl p-6 sm:p-8 lg:p-10"
            >
              <div className="group mb-6">
                <label
                  htmlFor="name"
                  className="mb-2.5 block text-[0.8rem] font-medium text-ink-soft transition-colors group-focus-within:text-accent"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  maxLength="100"
                  required
                  className="input-premium"
                />
              </div>

              <div className="group mb-6">
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-[0.8rem] font-medium text-ink-soft transition-colors group-focus-within:text-accent"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  maxLength="150"
                  required
                  className="input-premium"
                />
              </div>

              <div className="group mb-7">
                <div className="mb-2.5 flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="text-[0.8rem] font-medium text-ink-soft transition-colors group-focus-within:text-accent"
                  >
                    Your Message
                  </label>
                  <span className="font-mono text-[0.65rem] text-ink-mute">
                    {messageLength}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  maxLength={MAX_MESSAGE}
                  required
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  className="input-premium min-h-[150px] resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#08090B]/30 border-t-[#08090B]" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {statusMessage && (
                  <motion.p
                    key={statusMessage}
                    initial={{ opacity: 0, y: 14, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    role="status"
                    aria-live="polite"
                    className={`mt-6 overflow-hidden rounded-xl border px-4 py-3 text-[0.85rem] leading-[1.7] ${
                      statusStyles[statusType] || statusStyles.error
                    }`}
                  >
                    {statusMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;