<template>
  <div class="w-5/6 bg-white rounded-md py-10 px-16">
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
