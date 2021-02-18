<template>
  <div class="w-5/6 bg-white rounded-md py-10 px-16">
    <AddressForm :address="address" action="edit" />
  </div>
</template>

<script>
import AddressForm from '~/components/Profile/Addresses/AddressForm'

export default {
  layout: 'profile',
  components: {
    AddressForm,
  },

  async asyncData({ error, $axios, params }) {
    try {
      const address = await $axios.$get(
        `/api/addresses/${params.id}?token=true`
      )

      return {
        address: address.data,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
