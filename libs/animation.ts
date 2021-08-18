export const sideBarVarients = {
  initial: {
    opacity: 0,
    x: 500,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: 500,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export const sideBarMoreVarients = {
  initial: {
    y: -20,
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      type: "tween",
    },
  },
  exit: { height: 0, y: 15, opacity: 0 },
};

export const searchbarVariants = {
  initial: {
    opacity: 0,
    width: 0,
  },
  animate: {
    opacity: 1,
    width: 250,
  },
  exit: { opacity: 0, width: 0 },
};

export const searchPageVarients = {
  initial: {
    opacity: 0,
    y: "200vh",
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
  exit: {
    transition: {
      duration: 0.5,
      type: "tween",
    },
    y: "200vh",
  },
};

export const showMoreSortVariants = {
  initial: {
    y: "-30px",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: "-10px",
    opacity: 0,
  },
};
