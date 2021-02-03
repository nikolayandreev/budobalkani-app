module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      display: ['Roboto Slab', 'sans-serif'],
      body: ['Rubik', 'sans-serif'],
    },
    extend: {
      colors: {
        'blue-accent': '#0749db',
        'yellow-accent': '#fddb25',
        'red-accent': '#f32516',
        'regal-blue': '#243c5a',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderRadius: ['first', 'last'],
    display: ['hover', 'group-hover']
  },
  plugins: [],
}
