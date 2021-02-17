<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link.title">
        <nuxt-link
          :to="link.href"
          :title="link.title"
          class="profile-link flex w-full flex-row flex-no-wrap items-center text-md font-medium text-gray-600 py-3 px-2 hover:text-gray-700 transition-all duration-300"
          :class="{
            'text-blue-accent hover:text-blue-accent':
              $route.path === link.href,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            v-html="link.icon"
          ></svg>
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />`,
          title: 'Моят акаунт',
          href: '/profile',
        },
        {
          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />`,
          title: 'Моите поръчки',
          href: '/profile/porachki',
        },
        {
          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />`,
          title: 'Моите ревюта',
          href: '/profile/otzivi',
        },
        {
          icon: `<path fill="#fff" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />`,
          title: 'Моите адреси',
          href: '/profile/adresi',
        },
      ],
    }
  },
}
</script>
