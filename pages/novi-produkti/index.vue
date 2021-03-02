<template>
  <div class="mt-20">
    <div>
      {{ filters }}
      <h4>Спортове</h4>
      <ul>
        <li>
          <input
            type="checkbox"
            id="judo"
            v-model="categoryId"
            value="1"
            @change="filterCategories"
          />
          <label for="judo">Джудо</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="karate"
            v-model="categoryId"
            value="2"
            @change="filterCategories"
          />
          <label for="karate">Карате</label>
        </li>
      </ul>
    </div>
    <ProductList v-if="!$fetchState.pending" :products="products" />
    <Pagination :prefix="`/novi-produkti?page=`" :meta="meta" :links="links" />
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
  data() {
    return {
      categoryId: [],
      filters: {},
      // Usage: this.filters = { ...this.filters, test: 1, test2: 2 }
      products: null,
      meta: null,
      links: null,
    }
  },
  watch: {
    '$route.query': '$fetch',
    filters: '$fetch',
  },
  async fetch() {
    await this.$axios
      .$get(`/api/products`, {
        params: {
          new: 1,
          page: this.$route.query.page ? this.$route.query.page : 1,
          category_id: this.filters.category_id,
        },
      })
      .then((res) => {
        this.products = res.data
        this.meta = res.meta
        this.links = res.links
      })
      .catch((res) => {
        return this.$nuxt.error({
          statusCode: 500,
        })
      })
  },
  methods: {
    filterCategories() {
      let params

      if (this.categoryId && this.categoryId.length) {
        this.filters.category_id = this.categoryId
      } else {
        delete this.filters.category_id
      }
    },
  },
  mounted() {
    if (this.$route.query.category_id) {
      this.categoryId = this.$route.query.category_id.split(',')
    }
  },
}
</script>
