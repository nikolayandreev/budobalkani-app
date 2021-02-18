<template>
  <div class="item deafult" v-if="address">
    <h4
      class="w-full mb-2 text-pink-600 uppercase font-medium text-xs"
      v-if="address.is_default"
    >
      Предпочитан адрес
    </h4>
    <div>
      <strong class="block capitalize text-md font-medium mb-1 text-gray-900">
        {{ address.first_name }}
        {{ address.last_name }}
      </strong>
      <span class="block text-sm text-gray-700">
        {{ address.phone }}
      </span>
      <span
        class="block text-sm text-gray-700"
        v-for="(addressLine, index) in address.address1"
        :key="index"
      >
        {{ addressLine }}
      </span>
    </div>
    <div class="actions ml-auto flex flex-row flex-wrap items-center">
      <nuxt-link
        class="text-sm mr-4 text-blue-500 hover:text-blue-800 hover:underline transition-all duration-300 flex flex-row items-center"
        :to="`/profile/adresi/${address.id}`"
        title="Редактирай"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-4 h-4 mr-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span>Редактирай</span>
      </nuxt-link>
      <button
        @click="deleteAddress(address.id)"
        title="Изтрий"
        class="outline-none focus:outline-none text-red-500 hover:text-red-700 hover:underline transition-all duration-300 text-sm flex flex-row items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-4 h-4 mr-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>Изтрий</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      required: false,
    },
  },
  methods: {
    deleteAddress(id) {
      this.$axios
        .$delete(`/api/addresses/${id}?token=true`)
        .then((res) => {
          this.$nuxt.$emit('updated-address')
        })
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style scoped lang="scss">
.item {
  @apply w-full flex flex-row flex-wrap py-4 border-b border-gray-300;
}

.item.default {
  @apply bg-red-100;
}
</style>
