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
        'blue-hover': '#1c5ef0',
        'yellow-accent': '#fddb25',
        'red-accent': '#f32516',
        'regal-blue': '#243c5a',
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    borderRadius: ['first', 'last'],
    opacity: ['group-hover', 'group-focus'],
    display: ['hover', 'group-hover', 'group-focus', 'responsive'],
    borderWidth: ['responsive', 'last', 'first']
  },
  plugins: [],
}
