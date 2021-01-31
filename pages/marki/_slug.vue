<template>
  <div>
    <pre>{{ term }}</pre>
    <pre>{{ products }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: false,
      error: false,
      products: null,
    }
  },
  async validate({ params, $axios, store }) {
    return store.state.brands.some((elem) => elem.slug === params.slug)
  },
  computed: {
    term() {
      return this.$store.state.brands.find(
        (elem) => elem.slug === this.$route.params.slug
      )
    },
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(
          `/wp-json/wc/v3/products?attribute=pa_marka&attribute_term=${this.term.id}`
        )
        .then((res) => {
          this.products = res
          this.pending = false
        })
        .catch((err) => {
          this.products = null
          this.error = true
          this.pending = false
        })
    },
  },
  mounted() {
    this.getProducts()
  },
}
</script>