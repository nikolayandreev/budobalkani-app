<template>
  <div>
    <Header />
    <Navigation />
    <section class="bg-gray-200">
      <div class="container py-10">
        <div class="flex flex-row flex-wrap">
          <ProfileNavigation />
          <Nuxt />
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
  created() {
    this.getUser()
    this.getAddresses()

    this.$nuxt.$on('updated-address', () => {
      this.getAddresses()
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
    async getUser() {
      if (!this.$auth.loggedIn) {
        return this.logout()
      }

      if (!this.$auth.user || !Object.keys(this.$auth.user).length) {
        return await this.$axios
          .$get('/api/customer/get?token=true')
          .then((res) => {
            this.$auth.setUser(res.data)
          })
          .catch((err) => this.logout())
      }

      return this.$auth.user
    },

    async getAddresses() {
      return await this.$axios
        .$get(`/api/addresses?token=true`)
        .then((res) => {
          this.$store.dispatch('profile/changeAddresses', res.data)
        })
        .catch((err) => console.error(err))
    },
  },
  mounted() {
    if (process.client) {
      this.initWishlist()
    }
  },
}
</script>
