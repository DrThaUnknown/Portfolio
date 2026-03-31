export type PlanetKey = "miller" | "mann" | "edmunds" | "pandora" | "arrakis";

export interface PlanetPalette {
  primary: string;
  bgDark: string;
  bg: string;
  bgLight: string;
  glow: string;
  frame: string;
  nebulaA: string;
  nebulaB: string;
  nebulaC: string;
}

export interface PlanetRenderConfig {
  baseGradient: string;
  surfaceTexture: string[];
  cloudLayer?: string;
  shadowInset: string;
  rimColor: string;
  rimGlow: string;
  specular: string;
}

export interface PlanetMoonConfig {
  size: number;
  orbitWidth: number;
  orbitHeight: number;
  angle: number;
  duration: number;
  gradient: string;
  glow: string;
  front: boolean;
}

export interface PlanetRingConfig {
  width: number;
  height: number;
  tilt: number;
  background: string;
  opacity: number;
  blur: number;
  frontInset: string;
  backInset: string;
  shadow: string;
}

export interface PlanetBackdropConfig {
  size: number;
  x: string;
  y: string;
  background: string;
  texture?: string[];
  atmosphere?: string;
  rimColor?: string;
  opacity: number;
  glow: string;
  blur: number;
}

export interface PlanetOrbitalConfig {
  displayScale: number;
  scaleNote: string;
  ring?: PlanetRingConfig;
  moons?: PlanetMoonConfig[];
  backdrop?: PlanetBackdropConfig;
}

export interface PlanetScanConfig {
  code: string;
  designation: string;
  biome: string;
  temperature: string;
  hazard: string;
  gravity: string;
  atmosphere: string;
  status: string;
  factoids: string[];
}

export interface PlanetConfig {
  key: PlanetKey;
  name: string;
  subtitle: string;
  palette: PlanetPalette;
  render: PlanetRenderConfig;
  orbital: PlanetOrbitalConfig;
  scan: PlanetScanConfig;
}

export const PLANET_ORDER: PlanetKey[] = [
  "miller",
  "mann",
  "edmunds",
  "pandora",
  "arrakis",
];

export const PLANETS: Record<PlanetKey, PlanetConfig> = {
  miller: {
    key: "miller",
    name: "Miller",
    subtitle: "Tidal water world",
    palette: {
      primary: "#8dd7ff",
      bgDark: "#050d16",
      bg: "#0a1520",
      bgLight: "#102131",
      glow: "rgba(141, 215, 255, 0.45)",
      frame: "rgba(141, 215, 255, 0.18)",
      nebulaA: "#09141d",
      nebulaB: "#12344f",
      nebulaC: "#8dd7ff",
    },
    render: {
      baseGradient: "radial-gradient(circle at 32% 26%, #f5fdff 0%, #8dd7ff 24%, #2e78ad 54%, #0c2234 88%)",
      surfaceTexture: [
        "radial-gradient(circle at 24% 30%, rgba(255,255,255,0.22) 0 18%, transparent 42%)",
        "radial-gradient(circle at 68% 64%, rgba(10,39,74,0.34) 0 24%, transparent 52%)",
        "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 42%, rgba(18,45,82,0.22) 100%)",
      ],
      cloudLayer: "radial-gradient(circle at 40% 32%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 54%)",
      shadowInset: "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0) 62%)",
      rimColor: "rgba(157, 232, 255, 0.72)",
      rimGlow: "0 0 28px rgba(141,215,255,0.35), 0 0 60px rgba(141,215,255,0.18), inset 0 0 18px rgba(141,215,255,0.12)",
      specular: "radial-gradient(circle, rgba(255,255,255,0.72), rgba(255,255,255,0))",
    },
    orbital: {
      displayScale: 1.14,
      scaleNote: "Inferred as the largest display target from its 1.3 g gravity and extreme tidal load.",
    },
    scan: {
      code: "MILLER",
      designation: "TIDAL-01",
      biome: "Global abyssal ocean",
      temperature: "2 C to 18 C",
      hazard: "Relativistic mega-tsunamis",
      gravity: "1.30 g",
      atmosphere: "Dense vapor and salt haze",
      status: "Hydrosphere unstable",
      factoids: [
        "Surface is dominated by a single shallow ocean basin.",
        "Wave fronts remain coherent across hundreds of kilometers.",
        "Local horizon distortion suggests extreme tidal loading.",
      ],
    },
  },
  mann: {
    key: "mann",
    name: "Mann",
    subtitle: "Cryogenic ice world",
    palette: {
      primary: "#d8ecff",
      bgDark: "#060b12",
      bg: "#0d141d",
      bgLight: "#172330",
      glow: "rgba(216, 236, 255, 0.38)",
      frame: "rgba(216, 236, 255, 0.16)",
      nebulaA: "#090d14",
      nebulaB: "#223141",
      nebulaC: "#d8ecff",
    },
    render: {
      baseGradient: "radial-gradient(circle at 30% 28%, #f8fbff 0%, #d8ecff 28%, #8ca4c1 56%, #253242 88%)",
      surfaceTexture: [
        "radial-gradient(circle at 26% 38%, rgba(255,255,255,0.18) 0 16%, transparent 38%)",
        "radial-gradient(circle at 70% 58%, rgba(132,161,188,0.30) 0 22%, transparent 48%)",
        "linear-gradient(140deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 42%, rgba(32,48,65,0.26) 100%)",
      ],
      cloudLayer: "radial-gradient(circle at 42% 28%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0) 56%)",
      shadowInset: "linear-gradient(90deg, rgba(0,0,0,0.94), rgba(0,0,0,0) 60%)",
      rimColor: "rgba(228, 241, 255, 0.65)",
      rimGlow: "0 0 28px rgba(216,236,255,0.28), 0 0 62px rgba(216,236,255,0.14), inset 0 0 18px rgba(216,236,255,0.12)",
      specular: "radial-gradient(circle, rgba(255,255,255,0.82), rgba(255,255,255,0))",
    },
    orbital: {
      displayScale: 0.84,
      scaleNote: "Displayed as the smallest world based on its 0.8 g ice-world presentation and narrow horizon cues.",
    },
    scan: {
      code: "MANN",
      designation: "CRYO-07",
      biome: "Nitrogen ice plains",
      temperature: "-128 C to -74 C",
      hazard: "False topography and sink caverns",
      gravity: "0.80 g",
      atmosphere: "Thin, crystal-laden air",
      status: "Cryosphere fractured",
      factoids: [
        "Surface clouds are frozen uplifts, not liquid weather.",
        "Ice sheets conceal voids large enough to swallow landers.",
        "Thermal readings lag reality due to reflective frost layers.",
      ],
    },
  },
  edmunds: {
    key: "edmunds",
    name: "Edmunds",
    subtitle: "Rocky desert frontier",
    palette: {
      primary: "#efb06d",
      bgDark: "#140c07",
      bg: "#20120a",
      bgLight: "#311d12",
      glow: "rgba(239, 176, 109, 0.4)",
      frame: "rgba(239, 176, 109, 0.18)",
      nebulaA: "#170b07",
      nebulaB: "#5f3014",
      nebulaC: "#efb06d",
    },
    render: {
      baseGradient: "radial-gradient(circle at 30% 28%, #ffd9a8 0%, #efb06d 30%, #955528 60%, #2b150a 88%)",
      surfaceTexture: [
        "radial-gradient(circle at 22% 32%, rgba(255,220,170,0.15) 0 18%, transparent 40%)",
        "radial-gradient(circle at 74% 66%, rgba(74,31,11,0.32) 0 26%, transparent 52%)",
        "linear-gradient(160deg, rgba(255,206,149,0.07) 0%, rgba(255,206,149,0) 46%, rgba(62,22,7,0.30) 100%)",
      ],
      cloudLayer: "radial-gradient(circle at 42% 32%, rgba(255,214,150,0.08) 0%, rgba(255,214,150,0) 54%)",
      shadowInset: "linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0) 60%)",
      rimColor: "rgba(255, 190, 117, 0.7)",
      rimGlow: "0 0 28px rgba(239,176,109,0.28), 0 0 62px rgba(239,176,109,0.16), inset 0 0 18px rgba(239,176,109,0.1)",
      specular: "radial-gradient(circle, rgba(255,232,196,0.55), rgba(255,232,196,0))",
    },
    orbital: {
      displayScale: 0.98,
      scaleNote: "Kept near Earth-class because the film presents it as the most conventionally habitable candidate.",
    },
    scan: {
      code: "EDMUNDS",
      designation: "ARID-12",
      biome: "Basalt desert and dust basins",
      temperature: "11 C to 43 C",
      hazard: "Abrasive silica storms",
      gravity: "0.93 g",
      atmosphere: "Dry, breathable with dust load",
      status: "Surface traversable",
      factoids: [
        "Basins show long-term erosion from seasonal dust surges.",
        "Thermal bands suggest habitable zones near shaded escarpments.",
        "Low humidity yields extreme day-night temperature swings.",
      ],
    },
  },
  pandora: {
    key: "pandora",
    name: "Pandora",
    subtitle: "Lush oceanic moon",
    palette: {
      primary: "#6fe9c5",
      bgDark: "#06110f",
      bg: "#0b1a17",
      bgLight: "#132925",
      glow: "rgba(111, 233, 197, 0.42)",
      frame: "rgba(111, 233, 197, 0.18)",
      nebulaA: "#061310",
      nebulaB: "#0e443d",
      nebulaC: "#6fe9c5",
    },
    render: {
      baseGradient: "radial-gradient(circle at 34% 24%, #edfff4 0%, #8ef0bc 18%, #38c870 36%, #1d8a5e 54%, #0b4738 76%, #041710 100%)",
      surfaceTexture: [
        "radial-gradient(circle at 36% 46%, rgba(16,172,76,0.44) 0 22%, transparent 48%)",
        "radial-gradient(circle at 68% 56%, rgba(8,68,38,0.38) 0 22%, transparent 48%)",
        "radial-gradient(circle at 54% 20%, rgba(90,220,148,0.24) 0 16%, transparent 36%)",
        "linear-gradient(148deg, rgba(20,160,75,0.10) 0%, rgba(0,0,0,0) 44%, rgba(4,36,20,0.30) 100%)",
      ],
      cloudLayer: [
        "linear-gradient(14deg, transparent 0 20%, rgba(255,255,255,0.20) 20% 28%, transparent 28% 46%, rgba(255,255,255,0.16) 46% 56%, transparent 56% 100%)",
        "radial-gradient(circle at 34% 26%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 46%)",
      ].join(","),
      shadowInset: "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0) 60%)",
      rimColor: "rgba(160, 240, 200, 0.72)",
      rimGlow: "0 0 28px rgba(111,233,197,0.28), 0 0 62px rgba(111,233,197,0.16), inset 0 0 18px rgba(160,240,200,0.12)",
      specular: "radial-gradient(circle, rgba(220,255,235,0.65), rgba(220,255,235,0))",
    },
    orbital: {
      displayScale: 0.9,
      scaleNote: "Scaled from the published 11,447 km diameter, which makes it slightly smaller than Earth.",
      backdrop: {
        size: 2.25,
        x: "64%",
        y: "36%",
        background: [
          "radial-gradient(circle at 32% 24%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.12) 18%, transparent 24%)",
          "linear-gradient(180deg, #d7efff 0%, #b6dbff 10%, #7eb7f3 20%, #5c97e0 32%, #306dbe 44%, #7db6f4 56%, #2f67b1 68%, #4f88d2 80%, #1c3f73 100%)",
          "linear-gradient(184deg, rgba(255,255,255,0.12) 6%, rgba(255,255,255,0) 14%, rgba(23,79,149,0.12) 24%, rgba(255,255,255,0.06) 34%, rgba(0,0,0,0.08) 48%, rgba(255,255,255,0.05) 62%, rgba(0,0,0,0.08) 76%, rgba(255,255,255,0.03) 92%)",
          "radial-gradient(circle at 30% 28%, #c7e4ff 0%, #75b4ff 24%, #3a76cf 58%, #14284f 94%)",
        ].join(","),
        texture: [
          "linear-gradient(178deg, rgba(255,255,255,0.12) 0 7%, transparent 7% 14%, rgba(255,255,255,0.08) 14% 22%, transparent 22% 30%, rgba(18,79,154,0.14) 30% 38%, transparent 38% 50%, rgba(255,255,255,0.06) 50% 60%, transparent 60% 72%, rgba(0,0,0,0.08) 72% 84%, transparent 84% 100%)",
        ],
        atmosphere: "radial-gradient(circle at 34% 24%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 42%)",
        rimColor: "rgba(165, 210, 255, 0.32)",
        opacity: 0.92,
        glow: "rgba(92, 158, 255, 0.22)",
        blur: 0,
      },
    },
    scan: {
      code: "PANDORA",
      designation: "XENO-03",
      biome: "Rainforest megafauna biosphere",
      temperature: "15 C to 31 C",
      hazard: "Hyper-adaptive apex fauna",
      gravity: "0.80 g",
      atmosphere: "Dense, oxygen-poor and reactive",
      status: "Bioluminescence saturated",
      factoids: [
        "Night-side emission spikes indicate globally networked flora.",
        "Magnetic turbulence causes persistent auroral interference.",
        "Canopy density hides terrain features from orbital scans.",
      ],
    },
  },
  arrakis: {
    key: "arrakis",
    name: "Arrakis",
    subtitle: "Deep desert spice world",
    palette: {
      primary: "#f3c36d",
      bgDark: "#120905",
      bg: "#1a0f08",
      bgLight: "#2a180d",
      glow: "rgba(243, 195, 109, 0.4)",
      frame: "rgba(243, 195, 109, 0.18)",
      nebulaA: "#110803",
      nebulaB: "#5c2e0f",
      nebulaC: "#f3c36d",
    },
    render: {
      baseGradient: "radial-gradient(circle at 32% 28%, #ffe3ad 0%, #f3c36d 28%, #af6a25 58%, #341705 88%)",
      surfaceTexture: [
        "radial-gradient(circle at 20% 34%, rgba(255,226,170,0.16) 0 16%, transparent 36%)",
        "radial-gradient(circle at 74% 62%, rgba(116,61,17,0.34) 0 24%, transparent 50%)",
        "linear-gradient(180deg, rgba(255,219,152,0.07) 0%, rgba(255,219,152,0) 42%, rgba(78,37,10,0.32) 100%)",
      ],
      cloudLayer: "radial-gradient(circle at 42% 30%, rgba(255,229,171,0.08) 0%, rgba(255,229,171,0) 54%)",
      shadowInset: "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0) 60%)",
      rimColor: "rgba(255, 209, 119, 0.72)",
      rimGlow: "0 0 28px rgba(243,195,109,0.32), 0 0 62px rgba(243,195,109,0.18), inset 0 0 18px rgba(243,195,109,0.1)",
      specular: "radial-gradient(circle, rgba(255,238,204,0.46), rgba(255,238,204,0))",
    },
    orbital: {
      displayScale: 1.04,
      scaleNote: "Displayed slightly above Earth-class and given a dust torus plus two moons drawn from Dune lore.",
      ring: {
        width: 1.86,
        height: 0.5,
        tilt: -14,
        background: [
          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,225,180,0.15) 14%, rgba(196,137,66,0.44) 44%, rgba(255,227,186,0.18) 72%, rgba(0,0,0,0) 100%)",
          "repeating-linear-gradient(90deg, rgba(255,230,192,0.05) 0 6px, rgba(160,103,42,0.12) 6px 12px, rgba(101,59,20,0.06) 12px 18px)",
        ].join(","),
        opacity: 0.8,
        blur: 3,
        frontInset: "50% 0 0 0",
        backInset: "0 0 50% 0",
        shadow: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.2), rgba(0,0,0,0))",
      },
      moons: [
        {
          size: 0.1,
          orbitWidth: 2.2,
          orbitHeight: 1.45,
          angle: 24,
          duration: 28,
          gradient: "radial-gradient(circle at 32% 28%, #e6d7b5 0%, #8e7658 62%, #4f3722 100%)",
          glow: "rgba(255,224,176,0.16)",
          front: false,
        },
        {
          size: 0.075,
          orbitWidth: 2.55,
          orbitHeight: 1.7,
          angle: 196,
          duration: 36,
          gradient: "radial-gradient(circle at 32% 28%, #f1e4c9 0%, #ad916f 58%, #5f4329 100%)",
          glow: "rgba(255,224,176,0.14)",
          front: true,
        },
      ],
    },
    scan: {
      code: "ARRAKIS",
      designation: "DUNE-09",
      biome: "Hyper-arid erg desert",
      temperature: "9 C to 62 C",
      hazard: "Planetary sandstorm fronts",
      gravity: "0.91 g",
      atmosphere: "Dry, dust-heavy, breathable",
      status: "Spice aerosol elevated",
      factoids: [
        "Surface ripples form kilometer-scale dune harmonics.",
        "Thermal plumes reveal massive subterranean movement.",
        "Wind shear patterns can erase vehicle tracks in minutes.",
      ],
    },
  },
};
