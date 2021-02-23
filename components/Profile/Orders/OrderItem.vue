<template>
  <div class="item">
    <div class="border-b">
      <div class="flex flex-row flex-wrap items-center px-6 py-3">
        <div class="flex flex-row flex-wrap items-center">
          <h4 class="text-xl font-medium text-gray-900">
            Поръчка #{{ order.id }}
          </h4>
          <span
            class="px-3 py-1 ml-2 text-xs font-normal border rounded-full badge"
            :class="{
              'bg-blue-200 text-blue-600 border-blue-300':
                order.status === 'pending',
              'bg-yellow-300 text-yellow-700 border-yellow-400':
                order.status === 'processing',
              'bg-red-200 text-red-600 border-red-300':
                order.status === 'canceled',
            }"
          >
            {{ order.status_label }}
          </span>
          <span class="w-full mt-1 text-sm text-gray-600">
            Регистрирана на {{ formatOrderDate(order.created_at) }}
          </span>
        </div>
        <nuxt-link
          class="inline-flex flex-row flex-wrap items-center justify-between w-auto px-6 py-2 ml-auto text-sm transition-all duration-300 bg-gray-100 border border-gray-400 rounded-md text-blue-accent hover:bg-blue-accent hover:text-white hover:border-blue-accent"
          :to="`/profile/porachki/${order.id}`"
          title="Детайли за поръчката"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-4 h-4 mr-1"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Детайли за поръчката</span>
        </nuxt-link>
      </div>
    </div>
    <div class="flex flex-row flex-wrap px-6 py-3">
      <div class="w-auto">
        <h4 class="mb-2 text-xs font-medium text-gray-500 uppercase">
          Изпратена до
        </h4>
        <p class="font-medium capitalize">
          {{ order.shipping_address.first_name }}
          {{ order.shipping_address.last_name }}
        </p>
        <p>
          {{
            order.shipping_address.address1[
              order.shipping_address.address1.length - 1
            ]
          }}
        </p>
      </div>
      <div class="w-auto ml-20">
        <h4 class="mb-2 text-xs font-medium text-gray-500 uppercase">
          Поръчка
        </h4>
        <p
          v-html="
            formatTotalItemsCount(
              order.total_item_count,
              order.total_qty_ordered
            )
          "
        ></p>
        <p>
          Общо
          <strong class="font-medium">
            {{ order.formated_grand_total }}
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      required: true,
    },
  },
  methods: {
    formatOrderDate(created_at) {
      const date = new Date(created_at)
      const localeDate = date.toLocaleDateString('bg').slice(0, -3)
      const localeTime = date.toLocaleTimeString('bg').slice(0, -3)

      return `${localeDate}, ${localeTime}ч.`
    },
    formatTotalItemsCount(count, qty) {
      return `<strong class="font-medium">${count}</strong> поръчан
      ${count > 1 ? 'артикула' : 'артикул'}`
    },
    showStatus(status) {
      return status
    },
  },
}
</script>
