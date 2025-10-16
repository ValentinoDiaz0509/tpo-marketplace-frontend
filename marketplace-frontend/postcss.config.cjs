module.exports = {
  plugins: {
    // 1. Tailwind debe ir primero para que genere el CSS base y de componentes
    tailwindcss: {},

    // 2. Autoprefixer debe ir después para añadir prefijos de navegadores
    //    al CSS generado por Tailwind.
    autoprefixer: {},
  },
};
