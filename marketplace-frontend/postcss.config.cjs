module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},

    // 2. Autoprefixer debe ir después para añadir prefijos de navegadores
    //    al CSS generado por Tailwind.
    autoprefixer: {},
  },
};
