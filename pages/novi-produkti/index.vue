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
  computed: {
    dateLatest() {
      let d = new Date()
      d.setMonth(d.getMonth() - 1)
      return d.toISOString()
    },
  },
  methods: {
    async getProducts() {
      const baseQuery = `?new=1`
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
    this.getProducts()
  },
}
</script>
