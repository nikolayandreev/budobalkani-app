<template>
  <div
    v-click-outside="closeDropdown"
    @mouseenter="openDropdown"
    @mouseleave="closeDropdown"
    class="relative flex flex-row items-center mr-10 cursor-pointer flex-nowrap group"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="w-6 h-6 mr-2 text-white"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
    <span class="font-semibold text-gray-300 group-hover:text-white"
      >Моят профил</span
    >
    <transition name="slide">
      <div
        class="absolute z-50 overflow-hidden bg-white rounded-md shadow-md dropdown"
        @mouseover="openDropdown"
        @mouseleave="closeDropdown"
        v-if="showDropdown"
      >
        <template v-if="loggedIn">
          <ul>
            <li v-for="link in links" :key="link.title">
              <nuxt-link
                :to="link.href"
                :title="link.title"
                class="block px-3 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800"
              >
                {{ link.title }}
              </nuxt-link>
            </li>
            <hr />
            <li>
              <form @submit.prevent="logout">
                <a
                  href="#"
                  @click="logout"
                  class="block px-3 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800"
                  >Изход</a
                >
              </form>
            </li>
          </ul>
        </template>
        <template v-else>
          <div
            class="flex flex-row items-center justify-center px-3 py-4 flex-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 text-blue-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <p class="w-auto pl-2 text-gray-600">Влезете в акаунта си.</p>
          </div>
          <div class="flex flex-row flex-nowrap">
            <nuxt-link
              to="/vhod"
              title="Влез в акаунта си"
              class="w-1/2 py-3 text-sm font-semibold text-center text-gray-300 transition-all duration-200 hover:text-white bg-blue-accent hover:bg-blue-hover rounded-bl-md"
            >
              Вход
            </nuxt-link>
            <nuxt-link
              to="/registracia"
              title="Нов акаунта"
              class="inline-block w-1/2 py-3 text-sm font-semibold text-center text-gray-600 transition-all duration-200 bg-gray-200 hover:bg-gray-300 hover:text-gray-700 rounded-br-md"
              >Регистрация</nuxt-link
            >
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      showDropdown: false,
      dropdownTimer: null,
      links: [
        {
          title: 'Моят акаунт',
          href: '/my-profile',
        },
        {
          title: 'Моите поръчки',
          href: '/my-profile/orders',
        },
        {
          title: 'Моите ревюта',
          href: '/my-profile/reviews',
        },
        {
          title: 'Моите адреси',
          href: '/my-profile/addresses',
        },
      ],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
  },
  mounted() {
    if (process.client && Cookie.get('budobalkani_jwt')) {
      this.$axios
        .$post('/wp-json/aam/v2/jwt/validate', {
          jwt: Cookie.get('budobalkani_jwt'),
        })
        .catch((err) => {
          this.logout()
        })
    }
  },
  methods: {
    openDropdown() {
      clearTimeout(this.dropdownTimer)
      this.dropdownTimer = setTimeout(() => {
        this.showDropdown = true
      }, 50)
    },
    closeDropdown() {
      clearTimeout(this.dropdownTimer)
      this.dropdownTimer = setTimeout(() => {
        this.showDropdown = false
      }, 100)
    },
    logout() {
      return this.$axios
        .$post('/wp-json/aam/v2/jwt/revoke', {
          jwt: Cookie.get('budobalkani_jwt'),
        })
        .then((res) => {
          Cookie.remove('budobalkani_jwt')
          Cookie.remove('budobalkani_jwt_expires')
          this.$store.dispatch('logoutCustomer')
        })
        .catch((err) => {
          Cookie.remove('budobalkani_jwt')
          Cookie.remove('budobalkani_jwt_expires')
          this.$store.dispatch('logoutCustomer')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  left: 50%;
  top: 130%;
  min-width: 15em;
  transform: translateX(-50%);
  transform-origin: top;
  transition: all 0.2s;
  overflow: visible;
  &:before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #ffffff transparent;
    left: 50%;
    transform: translateX(-50%);
    top: -5px;
    z-index: 60;
  }
  ul {
    li {
      &:first-child {
        a {
          @apply rounded-tr-md rounded-tl-md;
        }
      }
      &:last-child {
        a {
          @apply rounded-br-md rounded-bl-md;
        }
      }
    }
  }
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-50%) scaleY(0);
  opacity: 0;
}
</style>