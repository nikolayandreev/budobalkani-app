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
    requiredFilters() {
      return `status=publish&stock_status=instock`
    },
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(
          `/wp-json/wc/v3/products?after=${this.dateLatest}&${this.requiredFilters}`
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