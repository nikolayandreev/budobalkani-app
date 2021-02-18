<template>
  <div>
    <pre>{{ category }}</pre>
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
  validate({ params, query, store }) {
    return store.state.categories.find((elem) => elem.slug === params.slug)
  },
  computed: {
    category() {
      return this.$store.state.categories.find(
        (elem) => elem.slug === this.$route.params.slug
      )
    },
    requiredFilters() {
      return `status=publish&stock_status=instock`
    },
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(
          `/wp-json/wc/v3/products?category=${this.category.id}&${this.requiredFilters}`
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