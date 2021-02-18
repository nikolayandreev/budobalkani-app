<template>
  <nav class="bg-white border-b border-color-grey-100">
    <div class="container">
      <ul class="relative flex flex-row flex-wrap justify-center">
        <template v-for="(link, index) in links">
          <!-- Ordinary link -->
          <li :key="index" v-if="!link.children && !link.mega">
            <nuxt-link
              :to="link.href"
              title="link.title"
              class="inline-block px-10 py-4 transition-all duration-300"
              :class="{
                'hover:bg-blue-accent hover:text-white text-gray-700':
                  !link.promotion && !link.latest,
                'bg-red-accent text-white hover:bg-red-600 font-medium':
                  link.promotion,
                'text-blue-accent hover:bg-blue-100 font-medium': link.latest,
                'text-blue-accent':
                  $route.path === link.href && !link.promotion,
              }"
            >
              {{ link.title }}
            </nuxt-link>
          </li>
          <!-- Dropdown -->
          <li v-if="link.children && !link.mega" :key="index" class="relative">
            <a
              class="inline-block px-10 py-4 text-gray-700 transition-all duration-300 hover:bg-blue-accent hover:text-white"
              href="#"
              :title="link.title"
              @mouseenter="openDropdown(link.identifier)"
              @mouseleave="closeDropdown"
            >
              {{ link.title }}
            </a>
            <transition name="slide">
              <ul
                v-if="activeDropdown === link.identifier"
                class="absolute z-40 w-auto text-gray-700 bg-white shadow-md rounded-bl-md rounded-br-md sub-menu"
                @mouseover="openDropdown(link.identifier)"
                @mouseleave="closeDropdown"
              >
                <li
                  v-for="(children, childIndex) in link.children"
                  :key="`sub_${childIndex}`"
                  @click="closeAll"
                >
                  <hr v-if="children.separate" class="border-gray-200" />
                  <nuxt-link
                    :class="{
                      'text-blue-accent': $route.path === children.href,
                    }"
                    :to="children.href"
                    :title="children.title"
                    class="inline-block w-full px-5 py-3 transition-all duration-300 text-md hover:bg-blue-accent hover:text-white"
                  >
                    {{ children.title }}
                  </nuxt-link>
                </li>
              </ul>
            </transition>
          </li>
          <!-- Mega Menu -->
          <li v-if="!link.children && link.columns && link.mega" :key="index">
            <a
              href="#"
              :title="link.title"
              class="inline-block px-10 py-4 text-gray-700 transition-all duration-300 hover:bg-blue-accent hover:text-white"
              @mouseover="openMega(link.identifier)"
              @mouseout="closeMega"
            >
              {{ link.title }}
            </a>
            <transition name="slide">
              <div
                class="absolute left-0 z-50 overflow-hidden bg-white shadow-lg rounded-bl-md rounded-br-md mega-menu"
                v-if="activeMega === link.identifier"
                @mouseover="openMega(link.identifier)"
                @mouseout="closeMega"
              >
                <div class="container flex flex-row flex-wrap">
                  <ul class="w-2/5 text-gray-800">
                    <li
                      @click="closeAll"
                      v-for="(column, colIndex) in link.columns"
                      :key="`mega_list_${colIndex}`"
                    >
                      <nuxt-link
                        @mouseover.native="activeColumn = column.id"
                        :to="column.href"
                        :title="column.title"
                        class="inline-block w-full px-3 py-3 text-left transition-all duration-300 text-md"
                        :class="{
                          'bg-blue-accent text-white':
                            activeColumn === column.id,
                        }"
                      >
                        {{ column.title }}
                      </nuxt-link>
                    </li>
                  </ul>
                  <template v-for="(column, colIndex) in link.columns">
                    <div
                      class="w-3/5 px-5 py-2 border-l border-gray-300"
                      :key="`mega_${colIndex}`"
                      v-if="
                        column.children.some(
                          (elem) => elem.parent === activeColumn
                        )
                      "
                    >
                      <h3 class="my-5 text-sm font-medium text-gray-500">
                        {{ column.title }}
                      </h3>
                      <ul
                        class="flex flex-row flex-wrap items-center justify-between"
                      >
                        <li
                          class="w-1/2"
                          v-for="(
                            columnChildren, colChildIndex
                          ) in column.children"
                          :key="`mega_child_${colChildIndex}`"
                          @click="closeAll"
                        >
                          <nuxt-link
                            class="inline-block py-3 text-sm text-gray-700 transition-all duration-300 hover:text-blue-accent"
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
            </transition>
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
    closeAll() {
      this.activeMega = null
      this.activeDropdown = null
    },
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
  min-width: 60%;
  top: 101%;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: top;
  transition: all 0.2s;
}
.sub-menu {
  left: 50%;
  top: 101%;
  transform: translateX(-50%);
  min-width: 15em;
  transform-origin: top;
  transition: all 0.2s;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-50%) scaleY(0);
  opacity: 0;
}
</style>
