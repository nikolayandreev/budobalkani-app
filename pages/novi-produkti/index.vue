<template>
  <div class="mt-20">
    <ProductList v-if="products" :products="products" />
    <Pagination :prefix="`/novi-produkti?page=`" :meta="meta" :links="links" />
    <pre>{{ products }}</pre>
  </div>
</template>

<script>
import ProductList from '~/components/base/Products/ProductList'
import Pagination from '~/components/base/Pagination'

export default {
  components: {
    ProductList,
    Pagination,
  },
  watchQuery: ['page'],
  async asyncData({ $axios, route, error }) {
    const products = await $axios.$get(
      `/api/products?new=1&page=${route.query.page ? route.query.page : 1}`
    )

    if (!products.data || !products.data.length) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    return {
      products: products ? products.data : null,
      meta: products ? products.meta : null,
      links: products ? products.links : null,
    }
  },
  methods: {
    // async getProducts(page) {
    //   this.baseQuery = `${this.baseQuery}&page=${
    //     this.$route.query.page ? this.$route.query.page : 1
    //   }`
    //   await this.$axios
    //     .$get(`/api/products${this.baseQuery}`)
    //     .then((res) => {
    //       this.products = res
    //       this.pending = false
    //       this.$store.dispatch('changeBaseQuery', this.baseQuery)
    //     })
    //     .catch((err) => {
    //       this.products = null
    //       this.error = true
    //       this.pending = false
    //     })
    // },
  },
}
</script>
