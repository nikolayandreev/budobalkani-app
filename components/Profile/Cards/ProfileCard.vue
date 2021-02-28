<template>
  <div
    class="flex flex-row flex-wrap w-full overflow-hidden bg-white rounded-md shadow-md"
  >
    <div v-if="!Object.keys(user).length" class="w-full px-5 py-4">
      <span class="text-sm text-gray-600">
        Моля изчакайте докато зареди данните за акаунта...
      </span>
    </div>

    <div
      class="w-full px-5 py-4 text-sm text-gray-700 wrapper"
      v-if="Object.keys(user).length"
    >
      <h1 class="w-full mb-3 font-semibold">Данни на акаунта</h1>

      <div class="flex flex-row flex-no-wrap items-start">
        <div class="self-center w-auto">
          <span
            class="inline-block px-8 py-4 mr-5 text-4xl font-medium text-white uppercase rounded-full bg-blue-accent"
            >{{ user.first_name[0] }}</span
          >
        </div>
        <div class="w-full">
          <h4 class="text-lg font-medium text-gray-900">{{ user.name }}</h4>
          <div class="leading-loose">
            <div class="flex flex-row flex-wrap items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-5 h-5 mr-1 text-blue-400"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{{ user.email }}</span>
            </div>
            <div class="flex flex-row flex-wrap items-center" v-if="phone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-5 h-5 mr-1 text-blue-400"
                fill="currentColor"
              >
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              <span>{{ phone }}</span>
            </div>
            <div
              class="flex flex-row flex-wrap items-center"
              v-if="user && user.date_of_birth_formatted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-5 h-5 mr-1 text-blue-400"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                />
              </svg>
              <span>
                {{ user.date_of_birth_formatted }}
              </span>
            </div>
          </div>
        </div>
        <div class="self-center w-40 pl-5 ml-5 text-center border-l">
          <span class="block text-xs">
            Благодарим ти, че си наш клиент от
          </span>
          <span class="block mt-2 text-lg font-medium text-gray-900">
            {{ user.created_at_formatted }}
          </span>
        </div>
      </div>
    </div>

    <nuxt-link
      :to="`/profile/redaktirane`"
      title="Редактирай своите лични данни"
      class="self-end block w-full py-2 text-center text-blue-600 bg-white border-t hover:text-blue-800 text-md hover:bg-gray-200"
    >
      Редактирай своите лични данни
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    defaultAddress: {
      required: false,
    },
    otherAddress: {
      required: false,
    },
  },
  computed: {
    phone() {
      if (this.defaultAddress) {
        return this.defaultAddress.phone
      }

      if (this.otherAddress) {
        return this.otherAddress.phone
      }

      return null
    },
  },
}
</script>
