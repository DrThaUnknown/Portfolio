"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { PLANETS, type PlanetConfig, type PlanetKey } from "@/data/planets";

type PlanetThemeContextValue = {
  activePlanet: PlanetKey;
  planet: PlanetConfig;
  setActivePlanet: (planet: PlanetKey) => void;
};

const STORAGE_KEY = "portfolio.active-planet";

const PlanetThemeContext = createContext<PlanetThemeContextValue | null>(null);

export function PlanetThemeProvider({ children }: { children: React.ReactNode }) {
  const [activePlanet, setPlanet] = useState<PlanetKey>("arrakis");
  const hydratedRef = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedPlanet = window.localStorage.getItem(STORAGE_KEY) as PlanetKey | null;
      if (storedPlanet && PLANETS[storedPlanet]) {
        setPlanet(storedPlanet);
      }
      hydratedRef.current = true;
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    window.localStorage.setItem(STORAGE_KEY, activePlanet);
  }, [activePlanet]);

  useEffect(() => {
    const root = document.documentElement;
    const palette = PLANETS[activePlanet].palette;
    const tween = gsap.to(root, {
      duration: 0.9,
      ease: "power2.out",
      "--primary": palette.primary,
      "--bg-dark": palette.bgDark,
      "--bg": palette.bg,
      "--bg-light": palette.bgLight,
      "--planet-glow": palette.glow,
      "--frame": palette.frame,
      "--nebula-a": palette.nebulaA,
      "--nebula-b": palette.nebulaB,
      "--nebula-c": palette.nebulaC,
    });

    return () => {
      tween.kill();
    };
  }, [activePlanet]);

  const setActivePlanet = (planetKey: PlanetKey) => {
    if (planetKey === activePlanet) return;
    startTransition(() => setPlanet(planetKey));
  };

  return (
    <PlanetThemeContext.Provider
      value={{
        activePlanet,
        planet: PLANETS[activePlanet],
        setActivePlanet,
      }}
    >
      {children}
    </PlanetThemeContext.Provider>
  );
}

export function usePlanetTheme() {
  const context = useContext(PlanetThemeContext);
  if (!context) {
    throw new Error("usePlanetTheme must be used inside PlanetThemeProvider");
  }
  return context;
}

