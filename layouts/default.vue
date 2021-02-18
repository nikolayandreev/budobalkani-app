<template>
  <div>
    <Header />
    <Navigation />
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <Nuxt />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header/Header'
import Navigation from '~/components/base/Navigation'
import Footer from '~/components/Footer/Footer'

export default {
  components: {
    Navigation,
    Header,
    Footer,
  },
  methods: {
    initWishlist() {
      const wishlist = localStorage.getItem('budobalkani_wishlist')
      this.$store.dispatch('wishlist/initWishlist', JSON.parse(wishlist))
    },
    logout() {
      return this.$auth.logout()
    },
    getUser() {
      if (!this.$auth.loggedIn) {
        return this.logout()
      }

      if (!this.$auth.user || !Object.keys(this.$auth.user).length) {
        return this.$axios
          .$get('/api/customer/get?token=true')
          .then((res) => {
            this.$auth.setUser(res.data)
          })
          .catch((err) => this.logout())
      }

      return this.$auth.user
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter(element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter(element) {
      element.style.height = 'auto'
    },
  },
  created() {
    this.getUser()
  },
  mounted() {
    if (process.client) {
      this.initWishlist()
    }
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
