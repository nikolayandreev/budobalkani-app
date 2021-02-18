<template>
  <div class="w-5/6 px-16 py-10 bg-white rounded-md shadow-md">
    {{ order }}
  </div>
</template>

<script>
export default {
  layout: 'profile',
  components: {},

  async asyncData({ error, $axios, params }) {
    try {
      const order = await $axios.$get(`/api/orders/${params.id}?token=true`)

      return {
        order: order.data,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
