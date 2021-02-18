<template>
  <div class="w-5/6">
    <div class="w-full shadow-md rounded-md overflow-hidden bg-white">
      <div class="wrapper py-10 px-16 mx-auto">
        <div class="item" v-for="order in orders" :key="order.id">
          <h4>Поръчка №{{ order.id }}</h4>
          <small
            >Регистрирана на 20.02.2018 14:55ч. | Общо
            {{ order.formated_grand_total }}</small
          ><br />
          Изпратена до<br />
          Николай Андреев<br />
          test@test.bg<br />
          0899886404<br />
          ул.Полковник Стоянов №730<br />
          София<br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Profile/ProfileNavigation'

export default {
  layout: 'profile',
  components: {
    Navigation,
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
