<template>
  <section class="products" v-if="products">
    <pre>{{ products }}</pre>

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