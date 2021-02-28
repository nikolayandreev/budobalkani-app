<template>
  <nav class="text-center pagination" v-if="meta">
    <ul
      class="inline-flex flex-row flex-no-wrap items-center justify-center text-gray-600"
    >
      <li
        class="previous"
        :class="{
          'pointer-events-none': !links.prev,
        }"
      >
        <nuxt-link
          :to="`${prefix}${prevPage}`"
          title="Предишна страница"
          class="arrows"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="inline-block w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </nuxt-link>
      </li>
      <li
        v-for="(page, index) in meta.last_page"
        :key="index"
        :class="{
          first: page == 1 && Math.abs(page - meta.current_page) > 3,
          last:
            page == meta.last_page && Math.abs(page - meta.current_page) > 3,
        }"
        class=""
        v-show="
          page == meta.last_page ||
          page == 1 ||
          Math.abs(page - meta.current_page) < 3
        "
      >
        <nuxt-link
          :class="{
            active: page === meta.current_page,
            'px-4 py-2': page < 10,
            'px-3 py-2': page >= 10,
          }"
          class="item"
          :to="`${prefix}${page}`"
          :title="`Към страница №${page}`"
        >
          {{ page }}
        </nuxt-link>
      </li>
      <li
        class="next"
        :class="{
          'pointer-events-none': !links.next,
        }"
      >
        <nuxt-link
          :to="`${prefix}${nextPage}`"
          title="Следваща страница"
          class="arrows"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="inline-block w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['prevLink', 'nextLink', 'prefix', 'meta', 'links'],
  computed: {
    prevPage() {
      return this.meta.current_page > 1
        ? this.meta.current_page - 1
        : this.meta.current_page
    },
    nextPage() {
      return this.meta.current_page < this.meta.last_page
        ? this.meta.current_page + 1
        : this.meta.current_page
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  @apply inline-block  transition-all duration-300 rounded-md mx-1 font-medium text-gray-500;
  &:hover {
    @apply text-gray-600 bg-gray-300;
  }
  &.active {
    @apply bg-blue-accent text-white;
  }
}
.arrows {
  @apply inline-block px-3 py-2 text-gray-500 transition-all duration-300 rounded-md;
  &:hover {
    @apply text-gray-600 bg-gray-300;
  }
}
li {
  display: inline-block;
  &.first:after,
  &.last:before {
    @apply text-gray-500;
    content: '...';
    display: inline-block;
    line-height: 1;
    margin: 0 5px;
  }
}
</style>