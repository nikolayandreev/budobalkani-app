<template>
  <div class="w-5/6 grid grid-cols-2 gap-5 auto-rows-min">
    <ProfileCard
      :user="user"
      :defaultAddress="defaultAddress"
      :otherAddress="otherAddress"
    />
    <AddressCard
      :defaultAddress="defaultAddress"
      :otherAddress="otherAddress"
      :addressesCount="addressesCount"
      :pending="pendingAddresses"
    />
  </div>
</template>

<script>
import Navigation from '~/components/Profile/ProfileNavigation'
import ProfileCard from '~/components/Profile/Cards/ProfileCard'
import AddressCard from '~/components/Profile/Cards/AddressCard'

export default {
  layout: 'profile',
  components: {
    Navigation,
    ProfileCard,
    AddressCard,
  },
  computed: {
    user() {
      return this.$auth.user
    },
    addresses() {
      if (this.$store.getters['profile/getAddresses']) {
        return this.$store.getters['profile/getAddresses']
      }

      return null
    },
    pendingAddresses() {
      return !this.addresses
    },
    defaultAddress() {
      return this.addresses
        ? this.addresses.find((elem) => elem.is_default)
        : null
    },
    addressesCount() {
      return this.addresses && this.addresses.length ? this.addresses.length : 0
    },
    otherAddress() {
      if (!this.addresses) {
        return null
      }

      if (!this.defaultAddress) {
        return this.addresses[this.addresses.length - 1]
      }

      return this.addresses.find((elem) => elem.id !== this.defaultAddress.id)
    },
  },
}
</script>
