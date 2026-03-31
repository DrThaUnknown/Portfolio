"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import BackToTop from "./BackToTop";
import PageTransition from "./PageTransition";

export default function AppLoadingWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  // Keep the app hidden and prevent scrolling while the loader is active
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (!done) {
      document.body.style.overflow = "hidden";
    }
    if (done) {
      document.body.dataset.appLoaded = "true";
      document.dispatchEvent(new Event("app:loaded"));
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [done]);

  return (
    <>
      {!done && <LoadingScreen onDone={() => setDone(true)} />}
      <div
        style={{
          opacity: done ? 1 : 0,
          visibility: done ? "visible" : "hidden",
          transition: "opacity 0.45s ease",
          pointerEvents: done ? "auto" : "none",
        }}
        aria-hidden={!done}
      >
        <PageTransition>
          {children}
        </PageTransition>
        <BackToTop />
      </div>
    </>
  );
}
