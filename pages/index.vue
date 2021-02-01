<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">wp-app</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        {{ $config.baseUrl }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios.$get('/wp-json/wc/v3/products').then((res) => console.log(res))
  },
}
</script>

<style>
</style>
