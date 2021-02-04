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
      return `status=publish&stock_status=instock`
    },
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(
          `/wp-json/wc/v3/products?attribute=pa_suitable&attribute_term=${process.env.MEN_ATTRIBUTE_ID}&attribute_term=${process.env.UNISEX_ATTRIBUTE_ID}&${this.requiredFilters}`
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