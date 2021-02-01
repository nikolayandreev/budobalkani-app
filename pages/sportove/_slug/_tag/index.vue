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
    return store.state.tags.find((elem) => elem.slug === params.tag)
  },
  computed: {
    tag() {
      return this.$store.state.tags.find(
        (elem) => elem.slug === this.$route.params.tag
      )
    },
    category() {
      return this.$store.state.categories.find(
        (elem) => elem.slug === this.$route.params.slug
      )
    },
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(
          `/wp-json/wc/v3/products?category=${this.category.id}&tag=${this.tag.id}&stock_status=instock`
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