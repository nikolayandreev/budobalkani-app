<template>
  <div
    class="flex flex-row items-center cursor-pointer text-rightflex-nowrap group"
  >
    <div class="relative inline-block">
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
        class="absolute text-sm font-semibold text-white rounded-full bg-red-accent badge"
        >3</span
      >
    </div>
    <span class="font-semibold text-gray-300 group-hover:text-white"
      >Моята Количка</span
    >
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.badge {
  right: -3px;
  top: -9px;
  line-height: 0;
  padding: 10px 6px;
}
</style>