<template>
  <div
    v-click-outside="closeDropdown"
    @mouseenter="openDropdown"
    @mouseleave="closeDropdown"
    class="relative flex flex-row items-center mr-10 flex-nowrap group"
  >
    <div class="relative inline-block cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6 mr-2 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span
        v-if="favorites && favorites.length"
        class="absolute text-sm font-semibold text-gray-800 rounded-full bg-yellow-accent badge"
        >{{ favorites.length }}</span
      >
    </div>
    <span
      class="font-semibold text-gray-300 cursor-pointer group-hover:text-white"
      >Любими</span
    >
    <transition name="slide">
      <div
        class="absolute z-50 overflow-hidden bg-white rounded-md shadow-md dropdown"
        @mouseover="openDropdown"
        @mouseleave="closeDropdown"
        v-if="showDropdown"
      >
        <template v-if="favorites && favorites.length">
          <div class="">
            <ul>
              <li v-for="link in favorites" :key="link.id">
                <nuxt-link
                  :to="`/produkti/${link.slug}`"
                  :title="link.name"
                  class="flex flex-row items-start w-full px-2 py-2 border-b border-gray-400 hover:bg-gray-200 fav-item"
                >
                  <div
                    class="w-auto h-16 overflow-hidden bg-white"
                    style="max-width: 4rem"
                  >
                    <img
                      class="object-contain"
                      :src="link.images[0].src"
                      :alt="link.name"
                    />
                  </div>
                  <div class="mx-2">
                    <span class="block text-xs leading-4 text-gray-800">{{
                      link.name
                    }}</span>
                    <div
                      class="flex flex-row items-center justify-between mt-2 flex-nowrap"
                    >
                      <button
                        @click.prevent="addToCart(link.id)"
                        class="flex flex-row flex-no-wrap items-center justify-center w-1/2 rounded-md hover:bg-gray-300 add-to-cart"
                        title="Добави в количката"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-4 h-4 mr-1 text-blue-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span class="py-1 text-xs leading-4 text-blue-accent"
                          >Купи</span
                        >
                      </button>
                      <button
                        @click.prevent="removeFromWishlist(link.id)"
                        class="flex flex-row flex-no-wrap items-center justify-center w-1/2 rounded-md hover:bg-gray-300 remove-from-wishlist"
                        :title="`Премахни ${link.name}`"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-4 h-4 mr-1 text-red-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span class="py-1 text-xs leading-4 text-red-accent"
                          >Премахни</span
                        >
                      </button>
                    </div>
                  </div>
                  <div class="self-center w-32 text-right whitespace-no-wrap">
                    <div v-if="link.on_sale" class="leading-4">
                      <span
                        class="block w-full text-xs font-semibold text-blue-accent"
                        >{{ link.sale_price }} лв.</span
                      >
                      <span
                        class="block w-full text-xs font-semibold text-gray-600 line-through"
                        >{{ link.regular_price }} лв.</span
                      >
                    </div>
                    <span
                      v-if="!link.on_sale"
                      class="block w-full text-xs font-semibold text-blue-accent"
                      >{{ link.price }} лв.</span
                    >
                  </div>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/lubimi"
                  title="Всички любими"
                  class="block py-1 text-center text-gray-500 bg-blue-100 hover:bg-blue-200 hover:text-gray-600"
                >
                  Виж всички продукти
                </nuxt-link>
              </li>
            </ul>
          </div>
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="w-auto pl-2 text-gray-600">Няма любими продукти</p>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      dropdownTimer: null,
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
    addToCart(id) {
      alert(id)
    },
    removeFromWishlist(id) {
      this.$store.dispatch('wishlist/removeFromWishlist', id)
      this.$store.dispatch('wishlist/updateWishlist')
    },
  },
  computed: {
    favorites() {
      return this.$store.getters['wishlist/getWishlist']
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  left: 50%;
  top: 130%;
  min-width: 25rem;
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

.badge {
  right: -3px;
  top: -9px;
  line-height: 0;
  padding: 10px 6px;
}
</style>