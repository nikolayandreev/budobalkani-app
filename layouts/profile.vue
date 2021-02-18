<template>
  <div>
    <Header />
    <Navigation />
    <section class="bg-gray-200">
      <div class="container py-10">
        <div class="flex flex-row flex-wrap">
          <ProfileNavigation />
          <transition
            name="slide-right"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter"
            @afterEnter="afterEnter"
          >
            <Nuxt />
          </transition>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header/Header'
import Navigation from '~/components/base/Navigation'
import ProfileNavigation from '~/components/Profile/ProfileNavigation'
import Footer from '~/components/Footer/Footer'

export default {
  middleware: 'auth',
  components: {
    Navigation,
    ProfileNavigation,
    Header,
    Footer,
  },
  data() {
    return {
      prevHeight: 0,
    }
  },
  created() {
    this.shouldGetUser()
    this.getAddresses()

    this.$nuxt.$on('updated-address', () => {
      this.getAddresses()
    })

    this.$nuxt.$on('user-changed', () => {
      this.getUser()
    })
  },
  methods: {
    initWishlist() {
      const wishlist = localStorage.getItem('budobalkani_wishlist')
      this.$store.dispatch('wishlist/initWishlist', JSON.parse(wishlist))
    },
    logout() {
      return this.$auth.logout()
    },
    shouldGetUser() {
      if (!this.$auth.loggedIn) {
        return this.logout()
      }

      if (!this.$auth.user || !Object.keys(this.$auth.user).length) {
        this.getUser()
      }

      return this.$auth.user
    },
    async getUser() {
      return await this.$axios
        .$get('/api/customer/get?token=true')
        .then((res) => {
          this.$auth.setUser(res.data)
        })
        .catch((err) => this.logout())
    },

    async getAddresses() {
      return await this.$axios
        .$get(`/api/addresses?token=true`)
        .then((res) => {
          this.$store.dispatch('profile/changeAddresses', res.data)
        })
        .catch((err) => console.error(err))
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
  mounted() {
    if (process.client) {
      this.initWishlist()
    }
  },
}
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>