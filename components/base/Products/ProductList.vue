<template>
  <section class="products" v-if="products">
    <!-- <div>{{ products.data }}</div> -->
    <div></div>
  </section>
</template>

<script>
export default {
  props: {
    products: {
      required: true,
    },
  },
}
</script>