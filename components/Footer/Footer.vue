<template>
  <footer class="border-t boder-gray-300">
    <div class="container">
      <div class="flex flex-row flex-wrap w-full py-6">
        <nav class="w-1/3" v-for="col in footerLinks" :key="col.title">
          <h4 class="mb-4 text-lg font-semibold text-blue-accent">
            {{ col.title }}
          </h4>
          <ul>
            <li v-for="link in col.children" :key="link.title">
              <nuxt-link
                :to="link.href"
                :title="link.title"
                class="block py-1 text-sm text-gray-700 hover:text-blue-accent"
              >
                {{ link.title }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerLinks: [
        {
          title: 'Спортове',
          children: [
            {
              title: 'Карате',
              href: '/sportove/karate',
            },
            {
              title: 'Джудо',
              href: '/sportove/judo',
            },
            {
              title: 'Самбо',
              href: '/sportove/sambo',
            },
            {
              title: 'Таекуондо',
              href: '/sportove/taekuondo',
            },
            {
              title: 'Айкидо',
              href: '/sportove/aikido',
            },
            {
              title: 'ММА и Бокс',
              href: '/sportove/mma-i-boks',
            },
            {
              title: 'Бразилско Джиу Джицу',
              href: '/sportove/brazilsko-djiu-djitsu',
            },
          ],
        },
        {
          title: 'Поръчки и доставка',
          children: [
            {
              title: 'Моят профил',
              href: '/profile',
            },
            {
              title: 'Как да поръчам онлайн',
              href: '/kak-da-porucham-online',
            },
            {
              title: 'Доставка на поръчките',
              href: '/dostavka-na-poruchkite',
            },
            {
              title: 'Често задавани въпроси',
              href: '/faq',
            },
            {
              title: 'Блог',
              href: '/blog',
            },
          ],
        },
        {
          title: 'Budobalkani',
          children: [
            {
              title: 'За нас',
              href: '/za-budobalkani',
            },
            {
              title: 'Контакти',
              href: '/kontakti',
            },
            {
              title: 'Политика за използване на бисквитки',
              href: '/politika-za-izpolzvane-na-biskvitki',
            },
            {
              title: 'Условия за ползване',
              href: '/uslovia-za-polzvane',
            },
            {
              title: 'Лични данни',
              href: '/lichni-danni',
            },
          ],
        },
      ],
    }
  },
}
</script>
