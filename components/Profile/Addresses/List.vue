<template>
  <div>
    <nuxt-link
      to="/profile/adresi/dobavi"
      title="Добави нов адрес"
      class="inline-flex flex-row justify-between flex-wrap w-auto items-center px-8 py-2 border border-gray-400 rounded-md bg-gray-100 text-blue-accent hover:bg-blue-accent hover:text-white hover:border-blue-accent transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-5 h-5 mr-2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span>Добави нов адрес</span>
    </nuxt-link>

    <small class="block my-4 text-gray-600">
      Общо <strong class="font-medium">{{ addressesCount }}</strong> адреса
    </small>

    <div v-if="pending" class="w-full">
      <span class="text-sm text-gray-600">
        Моля изчакайте докато заредим адресите...
      </span>
    </div>

    <div v-if="!defaultAddress && !otherAddresses && !pending" class="w-full">
      <span class="text-sm text-gray-600">Няма запазени адреси!</span>
    </div>

    <AddressesListItem :address="defaultAddress" />

    <template v-for="address in otherAddresses">
      <AddressesListItem :key="address.id" :address="address" />
    </template>
  </div>
</template>

<script>
import AddressesListItem from '~/components/Profile/Addresses/ListItem'

export default {
  components: {
    AddressesListItem,
  },
  props: {
    pending: {
      required: false,
    },
    otherAddresses: {
      required: false,
    },
    addressesCount: {
      required: false,
      type: Number,
    },
    defaultAddress: {
      required: false,
    },
  },
}
</script>
