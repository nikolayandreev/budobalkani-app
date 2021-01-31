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
  async asyncData({ $axios, params }) {
    const data = await $axios.$get(
      `/wp-json/wc/v3/products/categories?slug=${params.slug}`
    )

    return {
      category: data.shift(),
    }
  },
  methods: {
    async getProducts() {
      await this.$axios
        .$get(`/wp-json/wc/v3/products?category=${this.category.id}`)
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