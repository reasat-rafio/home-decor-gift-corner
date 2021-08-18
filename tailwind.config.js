module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundColor: {
          yellow: "#FFBA01",
          gray: "#E5E5E5",
          brown: "#212122",
          antiFlashWhite: "#F0F0F0",
        },
        fontFamily: {
          jost: ["Jost", "sans-serif"],
        },
        textColor: {
          primary: "#F0F0F0",
          yellow: "#FFBA01",
        },
        padding: {
          section: "80px",
        },
      },
    },
    variants: {},
    plugins: [
      require("tailwind-scrollbar"),
      require("@tailwindcss/typography"),
      require("@tailwindcss/forms"),
    ],
  };
  