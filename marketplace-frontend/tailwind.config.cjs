/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores del Admin Panel y Login
        "primary": "#32CD32",
        "background-dark": "#121212",
        "component-dark": "#1E1E1E",
        "modal-background-dark": "#1E1E1E",
        
        // Colores del Sitio Principal (Home, Details)
        "secondary": "#DA00FF", // El color fucsia/violeta
        "brand-lime": "#84CC16",
        "brand-blue": "#0d7ff2",

        // Paleta de grises
        "brand-gray": {
          light: "#90adcb", // Textos secundarios
          medium: "#223649", // Fondos de botones/inputs
          dark: "#182634",  // Fondos de secciones
        }
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
}
