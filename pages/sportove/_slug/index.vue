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
  },
  methods: {
    async getProducts() {
      const baseQuery = `?categories=${this.category.id}`
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