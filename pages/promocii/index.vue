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
    requiredFilters() {
      return `status=publish`
    },
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(`/wp-json/wc/v3/products?on_sale=1&${this.requiredFilters}`)
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