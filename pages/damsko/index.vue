<template>
  <div>
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
  methods: {
    async getProducts() {
      const baseQuery = `?suitable=${process.env.ST_WOMEN},${process.env.ST_UNISEX}`
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
