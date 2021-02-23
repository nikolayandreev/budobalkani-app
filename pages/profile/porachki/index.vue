<template>
  <div class="w-5/6">
    <div class="w-full">
      <div class="mx-auto wrapper">
        <OrderItem v-for="order in orders" :key="order.id" :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Profile/ProfileNavigation'
import OrderItem from '~/components/Profile/Orders/OrderItem'

export default {
  layout: 'profile',
  components: {
    Navigation,
    OrderItem,
  },
  beforeCreate() {
    this.$store.dispatch('profile/changeOrders')
  },
  computed: {
    orders() {
      return this.$store.getters['profile/getOrders']
    },
  },
}
</script>

<style scoped>
.item {
  @apply text-gray-700 shadow-md rounded-md  bg-white mt-8;
}
.item:first-child {
  margin: 0;
}
</style>
