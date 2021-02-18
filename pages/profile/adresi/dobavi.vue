<template>
  <div class="w-5/6 px-16 py-10 bg-white rounded-md shadow-md">
    <AddressForm action="create" />
  </div>
</template>

<script>
import AddressForm from '~/components/Profile/Addresses/AddressForm'

export default {
  layout: 'profile',
  components: {
    AddressForm,
  },
}
</script>
