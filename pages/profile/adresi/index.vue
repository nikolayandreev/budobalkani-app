<template>
  <section class="bg-gray-200">
    <div class="container py-5">
      <div class="flex flex-row flex-wrap">
        <Navigation class="w-auto" style="min-width: 250px" />
        <div
          class="w-5/6 py-5 px-8 bg-gray-200 rounded-md justify-between flex flex-row flex-wrap"
        >
          test
          {{ addresses }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navigation from '~/components/Profile/ProfileNavigation'

export default {
  middleware: 'auth',
  beforeCreate() {
    if (!this.$store.getters['profile/getAddresses']) {
      return this.$axios
        .$get(`/api/addresses?token=true`)
        .then((res) => {
          this.$store.dispatch('profile/changeAddresses', res.data)
          this.pendingAddresses = false
        })
        .catch((err) => console.error(err))
    }
  },
  data() {
    return {
      pendingAddresses: !this.$store.getters['profile/getAddresses'],
    }
  },
  components: {
    Navigation,
  },
  computed: {
    user() {
      return this.$auth.user
    },
    addresses() {
      return this.$store.getters['profile/getAddresses']
    },
    defaultAddress() {
      return this.addresses
        ? this.addresses.find((elem) => elem.is_default)
        : null
    },
  },
}
</script>

<style scoped>
.loading {
  @apply text-gray-300;
}
</style>
