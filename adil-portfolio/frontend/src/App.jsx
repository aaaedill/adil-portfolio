import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  Background,
  Cursor,
  Preloader,
  ScrollProgress,
} from "./components/Effects";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Internship from "./sections/Internship";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Always start at the top on load / refresh
    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="portfolio relative">
      {/* INTRO */}
      <Preloader onDone={() => setLoaded(true)} />

      {/* GLOBAL EFFECTS */}
      <Background />
      <ScrollProgress />
      <Cursor />
      <div className="noise" aria-hidden="true" />

      {/* CONTENT (sits above the background) */}
      <div className="relative z-10">
        <Navbar ready={loaded} />

        <main>
          <Hero ready={loaded} />
          <About />
          <Skills />
          <Projects />
          <Internship />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;