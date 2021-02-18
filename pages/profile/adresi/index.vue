<template>
  <div class="w-5/6">
    <div class="w-full shadow-md rounded-md overflow-hidden bg-white">
      <div class="wrapper py-10 px-16 mx-auto">
        <AddressesList
          :otherAddresses.sync="otherAddresses"
          :defaultAddress.sync="defaultAddress"
          :addressesCount="addressesCount"
          :pending="pendingAddresses"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Profile/ProfileNavigation'
import AddressesList from '~/components/Profile/Addresses/List'

export default {
  layout: 'profile',
  components: {
    Navigation,
    AddressesList,
  },
  computed: {
    addresses() {
      return this.$store.getters['profile/getAddresses']
    },
    pendingAddresses() {
      return !this.addresses
    },
    addressesCount() {
      return this.addresses && this.addresses.length ? this.addresses.length : 0
    },
    defaultAddress() {
      return this.addresses
        ? this.addresses.find((elem) => elem.is_default)
        : null
    },
    otherAddresses() {
      if (!this.addresses) {
        return null
      }

      return this.addresses.filter((elem) => !elem.is_default)
    },
  },
}
</script>
