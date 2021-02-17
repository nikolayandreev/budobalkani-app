<template>
  <div class="shadow-md rounded-md overflow-hidden bg-white">
    <div class="flex flex-row flex-wrap items-start py-4 px-5">
      <h1 class="w-full text-sm text-gray-700 font-semibold">Моите адреси</h1>
      <small
        class="text-gray-600 text-xs mb-3 font-light block w-full"
        v-if="!pending"
      >
        {{ addressesCount }} запазени адреси
      </small>
      <div v-if="pending">
        <span class="text-sm text-gray-600">
          Моля изчакайте докато заредим адресите...
        </span>
      </div>
      <div class="flex flex-row flex-no-wrap w-full">
        <div class="inline-block" v-if="defaultAddress && !pending">
          <h4 class="text-pink-600 w-auto text-xs uppercase font-medium">
            Предпочитан адрес
          </h4>
          <div class="my-1">
            <strong class="block capitalize text-sm">
              {{ defaultAddress.first_name }}
              {{ defaultAddress.last_name }}
            </strong>
            <span class="block text-xs">
              {{ defaultAddress.phone }}
            </span>
          </div>
          <span
            class="block text-xs"
            v-for="(addressLine, index) in defaultAddress.address1"
            :key="index"
          >
            {{ addressLine }}
          </span>
        </div>

        <div
          class="inline-block border-l pl-5 ml-5"
          v-if="defaultAddress && !pending && otherAddress"
        >
          <h4 class="text-gray-600 w-auto text-xs uppercase font-medium">
            Други адреси
          </h4>
          <div class="my-1 inline-block">
            <strong class="capitalize block text-sm">
              {{ otherAddress.first_name }}
              {{ otherAddress.last_name }}
            </strong>
            <span class="block text-xs"> {{ otherAddress.phone }}</span>
          </div>
          <span
            class="block text-xs"
            v-for="(addressLine, index) in otherAddress.address1"
            :key="index"
          >
            {{ addressLine }}
          </span>
        </div>
      </div>

      <div v-if="!defaultAddress && !pending">
        <span class="text-sm text-gray-600">Няма запазени адреси!</span>
      </div>
    </div>
    <nuxt-link
      :to="`/profile/adresi`"
      title="Редактирай профила си"
      class="flex flex-row items-center border-t w-full justify-center py-2 bg-white text-blue-600 hover:text-blue-800 text-md hover:bg-gray-200"
    >
      Управлявай своите адреси
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    pending: {
      required: false,
    },
    defaultAddress: {
      required: false,
    },
    addresses: {
      required: false,
    },
  },
  computed: {
    addressesCount() {
      return this.addresses && this.addresses.length ? this.addresses.length : 0
    },
    otherAddress() {
      if (!this.defaultAddress) {
        return this.addresses
      }

      return this.addresses.find((elem) => elem.id !== this.defaultAddress.id)
    },
  },
}
</script>
