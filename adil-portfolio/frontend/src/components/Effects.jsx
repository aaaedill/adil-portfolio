import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
} from "motion/react";

/* =========================================
   SCROLL PROGRESS BAR (top of screen)
========================================= */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}


/* =========================================
   GLOBAL BACKGROUND
   Fixed aurora + fading grid + vignette that
   sits behind every section.
========================================= */

export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="grid-fade absolute inset-0" />

      <div className="aurora">
        <div
          className="aurora-blob lime"
          style={{ width: 620, height: 620, top: "-12%", left: "-8%" }}
        />
        <div
          className="aurora-blob deep"
          style={{ width: 560, height: 560, top: "35%", right: "-12%" }}
        />
        <div
          className="aurora-blob cool"
          style={{ width: 520, height: 520, bottom: "-15%", left: "25%" }}
        />
      </div>

      <div className="vignette absolute inset-0" />
    </div>
  );
}


/* =========================================
   CUSTOM CURSOR (desktop / mouse only)
========================================= */

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isMouse) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      setHovering(
        !!e.target.closest?.("a, button, input, textarea, select, [data-cursor]")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className={`cursor-ring ${hovering ? "is-hover" : ""}`}
        style={{ x: ringX, y: ringY }}
      />
      <motion.div className="cursor-dot" style={{ x, y }} />
    </>
  );
}


/* =========================================
   PRELOADER (intro counter)
========================================= */

export function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(timer);
          return 100;
        }
        return c + 1;
      });
    }, 16);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (count === 100) {
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
  }, [count]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#08090B]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="aurora">
            <div
              className="aurora-blob lime"
              style={{ width: 480, height: 480, top: "20%", left: "30%" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            Adil Abdullah
          </motion.p>

          <div className="relative z-10 mt-4 font-heading text-[clamp(4rem,14vw,9rem)] font-semibold leading-none tracking-tighter text-ink">
            {String(count).padStart(2, "0")}
            <span className="text-accent">%</span>
          </div>

          <div className="relative z-10 mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: count / 100 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}