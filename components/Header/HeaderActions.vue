<template>
  <div class="flex flex-row flex-wrap items-center justify-end">
    <MyProfile />
    <Favorites />
    <Cart />
  </div>
</template>

<script>
import MyProfile from '~/components/Header/Actions/MyProfile'
import Favorites from '~/components/Header/Actions/Favorites'
import Cart from '~/components/Header/Actions/Cart'

export default {
  components: {
    MyProfile,
    Favorites,
    Cart,
  },
}
</script>