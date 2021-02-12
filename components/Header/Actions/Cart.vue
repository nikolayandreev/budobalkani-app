<template>
  <div
    v-click-outside="closeDropdown"
    @mouseenter="openDropdown"
    @mouseleave="closeDropdown"
    class="relative flex flex-row items-center text-rightflex-nowrap group"
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span
        v-if="cart && cart.length"
        class="absolute text-sm font-semibold text-white rounded-full bg-red-accent badge"
        >{{ cart.length }}</span
      >
    </div>
    <span
      class="font-semibold text-gray-300 cursor-pointer group-hover:text-white"
      >Моята Количка</span
    >
    <transition name="slide">
      <div
        class="absolute z-50 overflow-hidden bg-white rounded-md shadow-md dropdown"
        @mouseover="openDropdown"
        @mouseleave="closeDropdown"
        v-if="showDropdown"
      >
        <template v-if="cart && cart.length">
          <div class="">
            <ul>
              <li v-for="link in cart" :key="link.id">
                <nuxt-link
                  :to="`/produkti/${link.slug}`"
                  :title="link.name"
                  class="flex flex-row items-start w-full px-2 py-2 border-b border-gray-400 hover:bg-gray-200 fav-item"
                >
                  <div
                    class="w-16 h-16 overflow-hidden bg-white"
                    style="max-width: 4rem"
                  >
                    <img
                      class="object-contain"
                      :src="link.images[0].src"
                      :alt="link.name"
                    />
                  </div>
                  <div class="w-64 mx-2">
                    <span class="block text-xs leading-4 text-gray-800">{{
                      link.name
                    }}</span>
                    <button
                      @click.prevent="removeFromCart(link.id)"
                      class="flex flex-row flex-no-wrap items-center justify-center remove-from-cart"
                      :title="`Премахни ${link.name}`"
                    >
                      <span
                        class="py-1 text-xs leading-4 text-red-accent hover:text-red-800 hover:underline"
                        >Премахни</span
                      >
                    </button>
                  </div>
                  <div class="self-center">
                    <div class="block px-1 text-sm text-gray-600">
                      x{{ link.quantity }}
                    </div>
                  </div>
                  <div class="self-center w-32 text-right whitespace-no-wrap">
                    <div v-if="link.on_sale" class="leading-4">
                      <span
                        class="block w-full text-xs font-semibold text-blue-accent"
                        >{{ parseFloat(link.sale_price).toFixed(2) }} лв.</span
                      >
                      <span
                        class="block w-full text-xs font-semibold text-gray-600 line-through"
                        >{{
                          parseFloat(link.regular_price).toFixed(2)
                        }}
                        лв.</span
                      >
                    </div>
                    <span
                      v-if="!link.on_sale"
                      class="block w-full text-xs font-semibold text-blue-accent"
                      >{{ parseFloat(link.price).toFixed(2) }} лв.</span
                    >
                  </div>
                </nuxt-link>
              </li>
              <li>
                <div
                  class="flex flex-row flex-no-wrap items-center justify-between px-3 py-2 bg-gray-200"
                >
                  <span class="text-sm font-semibold text-gray-600"
                    >Общо {{ quantity }} продукта</span
                  >
                  <span class="text-sm font-semibold text-blue-accent">
                    {{ parseFloat(total).toFixed(2) }} лв.
                  </span>
                </div>
              </li>
              <li>
                <nuxt-link
                  to="/cart"
                  title="Към количката"
                  class="flex flex-row flex-wrap items-center justify-center w-full py-3 text-gray-300 transition-all duration-200 hover:text-white bg-blue-accent hover:bg-blue-hover"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-6 h-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  <span class="text-lg font-semibold">Към количката</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div
            class="flex flex-row items-center justify-center w-full px-3 py-4"
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
            <p class="w-auto pl-2 text-gray-600">Няма продукти в количката</p>
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
      total: 0,
      quantity: 0,
      showDropdown: false,
      dropdownTimer: null,
      cart: null,
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
    removeFromCart(id) {
      const index = this.cart.findIndex((elem) => elem.id === id)
      return this.cart.splice(index, 1)
    },
  },
  watch: {
    cart(val) {
      if (val && val.length) {
        this.quantity = this.cart
          .map((elem) => elem.quantity)
          .reduce((accumulator, elem) => {
            return parseInt(accumulator) + parseInt(elem)
          })

        this.total = this.cart
          .map((elem) => (elem.on_sale ? elem.sale_price : elem.price))
          .reduce((accumulator, elem) => {
            return parseFloat(accumulator) + parseFloat(elem)
          })
      }
    },
  },
  computed: {
    requiredFilters() {
      return `status=publish&stock_status=instock`
    },
  },
  mounted() {
    this.$axios
      .$get(`/api/products`)
      .then((res) => {
        this.cart = res.map((elem) => {
          return {
            quantity: 1,
            id: elem.id,
            slug: elem.slug,
            name: elem.name,
            images: elem.images,
            price: elem.price,
            regular_price: elem.regular_price,
            sale_price: elem.sale_price,
            on_sale: elem.on_sale,
          }
        })
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  right: 0;
  top: 130%;
  min-width: 25rem;
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
    top: -5px;
    right: 30px;
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
  transform: scaleY(0);
  opacity: 0;
}
.badge {
  right: -3px;
  top: -9px;
  line-height: 0;
  padding: 10px 6px;
}
</style>
