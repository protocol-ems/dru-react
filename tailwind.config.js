module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'

  variants: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-scrollbar"),
    // ...
  ],
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#252A34",
  //         "primary-focus": "#24272e",
  //         "primary-content": "#ffffff",
  //         secondary: "#FF2E63",
  //         "secondary-focus": "#d7375f",
  //         "secondary-content": "#ffffff",
  //         accent: "#08d9d6",
  //         "accent-focus": "#10b2b0",
  //         "accent-content": "#ffffff",
  //         neutral: "#3d4451",
  //         "neutral-focus": "#2a2e37",
  //         "neutral-content": "#ffffff",
  //         "base-100": "#ffffff",
  //         "base-200": "#f9fafb",
  //         "base-300": "#d1d5db",
  //         "base-content": "#1f2937",
  //         info: "#2094f3",
  //         success: "#009485",
  //         warning: "#FF2E63",
  //         error: "#ff5724",
  //       },
  //     },
  //   ],
  // },
};
