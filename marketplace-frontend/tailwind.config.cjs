/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
        },
        "background-dark": "#0D1117",
        "card-dark": "#rgba(1, 1, 1, 1)",
        "text-dark": "#E5E7EB",
        "subtext-dark": "#9CA3AF",
        "border-dark": "#30363D",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
    },
  },

  plugins: [],
};
