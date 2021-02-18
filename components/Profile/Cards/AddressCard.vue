<template>
  <div
    class="flex flex-row flex-wrap w-full shadow-md rounded-md overflow-hidden bg-white"
  >
    <div v-if="pending" class="w-full px-5 py-4">
      <span class="text-sm text-gray-600">
        Моля изчакайте докато заредим адресите...
      </span>
    </div>

    <div
      v-if="!defaultAddress && !otherAddress && !pending"
      class="w-full px-5 py-4"
    >
      <span class="text-sm text-gray-600">Няма запазени адреси!</span>
    </div>

    <!-- Main Grid -->
    <div
      class="wrapper w-full py-4 px-5"
      v-if="!pending && (defaultAddress || otherAddress)"
    >
      <h1 class="w-full text-sm text-gray-700 font-semibold">Моите адреси</h1>
      <small
        class="text-gray-600 text-xs mb-3 font-light block w-full"
        v-if="!pending"
      >
        {{ addressesCount }} запазени адреси
      </small>
      <div class="flex flex-row flex-no-wrap items-center">
        <div class="inline-block" v-if="defaultAddress && !pending">
          <h4 class="text-pink-600 w-auto text-xs uppercase font-medium">
            Предпочитан адрес
          </h4>
          <div class="my-1">
            <strong class="block capitalize text-sm text-gray-900">
              {{ defaultAddress.first_name }}
              {{ defaultAddress.last_name }}
            </strong>
            <span class="block text-xs text-gray-700">
              {{ defaultAddress.phone }}
            </span>
          </div>
          <span
            class="block text-xs text-gray-700"
            v-for="(addressLine, index) in defaultAddress.address1"
            :key="index"
          >
            {{ addressLine }}
          </span>
        </div>

        <div
          class="inline-block"
          :class="{ 'pl-5 ml-5 border-l': defaultAddress }"
          v-if="!pending && otherAddress"
        >
          <h4 class="text-gray-600 w-auto text-xs uppercase font-medium">
            {{ defaultAddress ? 'Други адреси' : 'Последно добавен адрес' }}
          </h4>
          <div class="my-1 inline-block">
            <strong class="capitalize block text-sm text-gray-900">
              {{ otherAddress.first_name }}
              {{ otherAddress.last_name }}
            </strong>
            <span class="block text-xs text-gray-700">
              {{ otherAddress.phone }}
            </span>
          </div>
          <span
            class="block text-xs text-gray-700"
            v-for="(addressLine, index) in otherAddress.address1"
            :key="index"
          >
            {{ addressLine }}
          </span>
        </div>
      </div>
    </div>
    <nuxt-link
      :to="`/profile/adresi`"
      title="Добави или премахни адрес"
      class="self-end block text-center border-t w-full py-2 bg-white text-blue-600 hover:text-blue-800 text-md hover:bg-gray-200"
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
    addressesCount: {
      required: false,
      type: Number,
    },
    otherAddress: {
      required: false,
    },
  },
}
</script>
