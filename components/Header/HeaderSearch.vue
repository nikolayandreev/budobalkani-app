<template>
  <form @submit.prevent="onSubmit" v-click-outside="closeSuggestions">
    <div class="relative flex flex-row flex-wrap">
      <input
        @focus="openSuggestions"
        type="text"
        placeholder="Потърси по име..."
        v-model="search"
        class="px-3 py-2 outline-none focus:outline-none"
      />
      <button
        type="submit"
        class="leading-none text-center text-gray-800 bg-yellow-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="w-6 h-6 mx-auto text-gray-800"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <div
        class="absolute z-50 w-full bg-white shadow-md search-box rounded-bl-md rounded-br-md"
        v-if="!hide && suggestions && suggestions.length"
      >
        <ul>
          <li
            v-for="suggestion in suggestions"
            :key="suggestion.id"
            @click="closeSuggestions"
          >
            <nuxt-link
              :to="`/produkti/${suggestion.slug}`"
              :title="suggestion.name"
              class="flex flex-row items-center w-full px-5 py-3 overflow-hidden transition-all duration-200 border-b border-gray-200 flex-nowrap search-result hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5 mr-3 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span
                class="text-gray-800"
                v-html="highlight(suggestion.name)"
              ></span>
            </nuxt-link>
          </li>
        </ul>
        <div
          class="py-1 text-center text-gray-500 bg-blue-100 cursor-pointer hover:bg-blue-200 hover:text-gray-600"
          @click="onSubmit"
          v-if="suggestions && suggestions.length"
        >
          Виж всички резултати
        </div>
      </div>

      <!-- Handle No Results and Invalid Entry -->
      <div
        v-if="!hide && noResults && !suggestions"
        class="absolute z-50 flex flex-row items-center w-full px-5 py-5 text-gray-700 bg-white shadow-md flex-nowrap text-1xl search-box rounded-bl-md rounded-br-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-gray-500"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Няма намерени резултати.</span>
      </div>
      <div
        v-if="!hide && showTip && !suggestions"
        class="absolute z-50 w-full px-5 py-5 text-gray-600 bg-white shadow-md text-1xl search-box rounded-bl-md rounded-br-md"
      >
        <p>Моля въведете поне 3 символа.</p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      pending: false,
      error: false,
      search: null,
      suggestions: null,
      showTip: false,
      noResults: false,
      hide: false,
    }
  },
  watch: {
    search(newValue, oldValue) {
      if ((newValue.length > 0 && newValue.length < 3) || newValue.length < 3) {
        this.suggestions = null
        this.showTip = true
      } else {
        this.showTip = false
      }

      if (newValue.length >= 3) {
        this.fetchProducts()
      }

      if (!newValue) {
        this.noResults = false
        this.suggestions = null
        this.showTip = false
      }
    },
  },
  methods: {
    highlight(string) {
      const substring = new RegExp(this.search, 'gi')
      string = string.replace(
        substring,
        `<span class="text-blue-600">${this.search}</span>`
      )

      return string
    },
    sanitizeInput(string) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      }
      const reg = /[&<>"'/]/gi
      return string.replace(reg, (match) => map[match])
    },
    onSubmit() {
      if (this.search && this.search.length) {
        return this.$router.push(
          `/tarsene?query=${this.sanitizeInput(this.search)}`
        )
      }
    },
    fetchProducts() {
      this.pending = true

      this.$axios
        .$get(
          `/wp-json/wc/v3/products?per_page=10&stock_status=instock&search=${this.sanitizeInput(
            this.search
          )}`
        )
        .then((res) => {
          if (res && res.length) {
            this.suggestions = res
            this.noResults = false
          } else {
            this.suggestions = null
            this.noResults = true
          }

          this.pending = false
        })
    },
    closeSuggestions() {
      this.hide = true
      this.noResult = false
      this.showTip = false
    },
    openSuggestions() {
      this.hide = false
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  width: calc(100% - 50px);
}
button {
  width: 50px;
}
.search-box {
  top: 100%;
}
</style>