export const SPRING_SNAPPY = { type: "spring" as const, stiffness: 300, damping: 30 };
export const SPRING_NATURAL = { type: "spring" as const, stiffness: 100, damping: 20 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 80, damping: 25 };

export const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const STAGGER_CONTAINER = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const STAGGER_ITEM = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
