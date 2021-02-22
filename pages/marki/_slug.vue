<template>
  <div>
    <pre>{{ brand }}</pre>
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
    return store.state.brands.some((elem) => elem.label === params.slug)
  },
  computed: {
    brand() {
      return this.$store.state.brands.find(
        (elem) => elem.label === this.$route.params.slug
      )
    },
  },
  methods: {
    async getProducts() {
      const baseQuery = `?brand=${this.brand.id}`

      await this.$axios
        .$get(`/api/products${baseQuery}`)
        .then((res) => {
          this.products = res.data
          this.pending = false
          this.$store.dispatch('changeBaseQuery', baseQuery)
        })
        .catch((err) => {
          this.products = null
          this.error = true
          this.pending = false
        })
    },
  },
  mounted() {
    this.$store.dispatch('changeBaseQuery', null)
    this.getProducts()
  },
}
</script>