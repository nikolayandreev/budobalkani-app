<template>
  <div class="shadow-md rounded-md overflow-hidden bg-white">
    <div class="py-4 px-5">
      <h1 class="w-full mb-3 text-sm text-gray-700 font-semibold">
        Данни на акаунта
      </h1>
      <div
        v-if="Object.keys(user).length"
        class="flex flex-row flex-wrap items-start"
      >
        <div class="w-2/12 self-center">
          <span
            class="rounded-full px-8 py-6 uppercase bg-blue-accent text-white inline-block"
            >{{ user.first_name ? user.first_name[0] : '' }}</span
          >
        </div>
        <div class="w-1/3 flex flex-row flex-wrap">
          <ul>
            <li v-if="user && user.email">
              <span class="text-xs text-gray-700">
                Email: {{ user.email }}
              </span>
            </li>
            <li v-if="user && user.name">
              <span class="text-xs text-gray-700">
                Имена: {{ user.name }}
              </span>
            </li>
            <li>
              <span
                class="text-xs text-gray-700"
                v-if="defaultAddress && defaultAddress.phone"
              >
                Телефон: {{ defaultAddress.phone }}
              </span>
              <span class="text-xs text-gray-700" v-else>Телефон: N/A</span>
            </li>
          </ul>
        </div>
        <div class="w-1/3">
          <ul>
            <li>
              <span
                class="text-xs text-gray-700"
                v-if="user && user.date_of_birth_formatted"
              >
                Рожден ден: {{ user.date_of_birth_formatted }}
              </span>
              <span class="text-xs text-gray-700" v-else>Рожден ден: N/A</span>
            </li>
            <li>
              <span class="text-xs text-gray-700" v-if="user && user.gender">
                Пол: {{ user.gender === 'Male' ? 'Мъж' : 'Жена' }}
              </span>
              <span class="text-xs text-gray-700" v-else>Пол: N/A</span>
            </li>
            <li v-if="user && user.created_at_formatted">
              <span class="text-xs text-gray-700">
                Регистриран преди: {{ user.created_at_formatted }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <span class="text-sm text-gray-600">
          Моля изчакайте докато зареди данните за акаунта...
        </span>
      </div>
    </div>
    <nuxt-link
      :to="`/profile/redaktirane`"
      title="Редактирай профила си"
      class="flex flex-row items-center border-t w-full justify-center py-2 bg-white text-blue-600 hover:text-blue-800 text-md hover:bg-gray-200"
    >
      Редактирай твоите данни
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
  },
}
</script>
