<template>
  <nav class="bg-white border-b border-color-grey-100">
    <div class="container">
      <ul class="relative flex flex-row flex-wrap justify-between">
        <template v-for="(link, index) in links">
          <li :key="index" v-if="!link.children && !link.mega">
            <nuxt-link
              :to="link.href"
              title="link.title"
              class="inline-block py-5"
            >
              {{ link.title }}
            </nuxt-link>
          </li>
          <li v-if="link.children && !link.mega" :key="index">
            <a
              class="inline-block py-5"
              href="#"
              :title="link.title"
              @mouseenter="openDropdown(link.identifier)"
              @mouseleave="closeDropdown"
            >
              {{ link.title }}
            </a>
            <ul
              v-if="activeDropdown === link.identifier"
              class="sub-menu"
              @mouseover="openDropdown(link.identifier)"
              @mouseleave="closeDropdown"
            >
              <li
                v-for="(children, childIndex) in link.children"
                :key="`sub_${childIndex}`"
              >
                <nuxt-link :to="children.href" :title="children.title">
                  {{ children.title }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li v-if="!link.children && link.columns && link.mega" :key="index">
            <a
              href="#"
              :title="link.title"
              class="inline-block py-5"
              @mouseover="openMega(link.identifier)"
              @mouseout="closeMega"
            >
              {{ link.title }}
            </a>
            <div
              class="absolute left-0 z-50 w-full bg-white shadow-lg mega-menu"
              v-if="activeMega === link.identifier"
              @mouseover="openMega(link.identifier)"
              @mouseout="closeMega"
            >
              <div class="container flex flex-row flex-wrap px-5 py-5">
                <ul class="w-1/5 pr-5 text-gray-700">
                  <li
                    v-for="(column, colIndex) in link.columns"
                    :key="`mega_list_${colIndex}`"
                  >
                    <nuxt-link
                      @mouseover.native="activeColumn = column.id"
                      :to="column.href"
                      :title="column.title"
                      class="inline-block w-full px-3 py-2 my-1 font-bold text-left transition-all duration-300 bg-blue-100 rounded-md outline-none focus:outline-none"
                      :class="{
                        'bg-blue-200 text-gray-800 shadow-inner':
                          activeColumn === column.id,
                      }"
                    >
                      {{ column.title }}
                    </nuxt-link>
                  </li>
                </ul>
                <template v-for="(column, colIndex) in link.columns">
                  <div
                    class="w-4/5 pl-5 text-gray-800 border-l border-grey-300"
                    :key="`mega_${colIndex}`"
                    v-if="
                      column.children.some(
                        (elem) => elem.parent === activeColumn
                      )
                    "
                  >
                    <ul class="flex flex-row flex-wrap justify-between">
                      <li
                        class="w-1/3"
                        v-for="(
                          columnChildren, colChildIndex
                        ) in column.children"
                        :key="`mega_child_${colChildIndex}`"
                      >
                        <nuxt-link
                          :to="columnChildren.href"
                          :title="columnChildren.title"
                        >
                          {{ columnChildren.title }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { NavLinks } from '~/includes/nav-links'

export default {
  data() {
    return {
      activeDropdown: '',
      activeMega: '',
      activeColumn: 1,
      links: NavLinks,
      dropdownTimer: null,
      megaTimer: null,
    }
  },
  methods: {
    openDropdown(identifier, type = 'dropdown') {
      clearTimeout(this.dropdownTimer)
      this.dropdownTimer = setTimeout(() => {
        this.activeDropdown = identifier
      }, 50)
    },
    closeDropdown() {
      clearTimeout(this.dropdownTimer)
      this.dropdownTimer = setTimeout(() => {
        this.activeDropdown = null
      }, 200)
    },
    openMega(identifier) {
      clearTimeout(this.megaTimer)
      this.megaTimer = setTimeout(() => {
        this.activeMega = identifier
      }, 50)
    },
    closeMega() {
      clearTimeout(this.megaTimer)
      this.megaTimer = setTimeout(() => {
        this.activeMega = null
      }, 200)
    },
  },
}
</script>

<style lang="scss" scoped>
.mega-menu {
  top: 100%;
}
</style>
