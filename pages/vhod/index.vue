<template>
  <form
    @submit.prevent="onSubmit"
    class="w-full mx-5 xs:w-8/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12"
  >
    <div class="container">
      <div class="bg-white rounded-md shadowm-lg">
        <div class="px-5 pt-4 sm:px-12 sm:pt-8">
          <h1 class="text-xl font-semibold text-gray-700">Влез в акаунта си</h1>
          <div class="flex flex-row flex-wrap">
            <span class="mr-1 text-sm text-gray-600">
              <span class="hidden xs:inline-block">Все още </span>
              <span class="capitalize sm:normal-case">нямаш</span> акаунт?</span
            >
            <nuxt-link
              class="text-sm font-medium text-blue-600 transition-all duration-200 border-b border-transparent hover:text-blue-700 hover:border-blue-600"
              to="/registracia"
              title="Влез в акаунта си"
              >Регистрирай се</nuxt-link
            >
          </div>
        </div>
        <div class="relative px-5 py-4 sm:py-6 sm:px-12">
          <div class="form-group" :class="status($v.loginForm.email)">
            <label for="username">Email</label>
            <input
              id="username"
              type="text"
              v-model="$v.loginForm.email.$model"
              placeholder="Email адрес..."
            />
            <transition name="skew">
              <div
                class="has-error"
                v-if="$v.loginForm.email.$invalid && $v.loginForm.email.$dirty"
              >
                Моля въведи валиден Email адрес
              </div>
            </transition>
          </div>
          <div class="form-group last" :class="status($v.loginForm.password)">
            <label for="password">Парола</label>
            <input
              id="password"
              type="password"
              v-model="$v.loginForm.password.$model"
              placeholder="Email адрес..."
            />
            <nuxt-link
              class="inline-block w-full mt-1 text-sm text-right text-gray-600"
              to="/zabravena-parola"
              title="Възстанови паролата си"
              >Забравена парола?</nuxt-link
            >
          </div>
          <transition name="skew">
            <div
              class="w-full text-center server-error"
              v-if="invalid_credentials"
            >
              Email адреса или паролата са грешни!
            </div>
          </transition>
        </div>
        <button
          :disabled="pending"
          :class="{ pending: pending }"
          type="submit"
          class="flex flex-row flex-wrap items-center justify-center w-full py-3 mt-2 text-lg font-semibold text-gray-300 transition-all duration-200 outline-none focus:outline-none rounded-bl-md rounded-br-md hover:text-white bg-blue-accent hover:bg-blue-hover"
        >
          Създай нов акаунт
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',
  data() {
    return {
      pending: false,
      invalid_credentials: false,
      server_error: false,
      loginForm: {
        email: '',
        password: '',
        remember_me: false,
      },
    }
  },
  validations: {
    loginForm: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      remember_me: {},
    },
  },
  watch: {
    'loginForm.email': function (val) {
      this.invalid_credentials = false
    },
    'loginForm.password': function (val) {
      this.invalid_credentials = false
    },
  },
  methods: {
    onSubmit() {
      this.$v.loginForm.$touch()
      if (this.$v.loginForm.$invalid) {
        this.pending = false
      } else {
        this.loginCustomer()
      }
    },
    async loginCustomer() {
      this.pending = true
      this.invalid_credentials = false
      await this.$axios
        .$post('/wp-json/aam/v2/authenticate', {
          username: this.loginForm.email,
          password: this.loginForm.password,
          issueJWT: true,
        })
        .then((res) => {
          localStorage.setItem('budobalkani_jwt', res.jwt.token)
          localStorage.setItem('budobalkani_jwt_expires', res.jwt.token_expires)

          this.$store.dispatch('setCustomerToken', res.jwt)
          this.pending = false
          return this.$router.push('/')
        })
        .catch((err) => {
          this.pending = false
          const data = err.response ? err.response.data : null

          if (!data) {
            this.server_error = true
            return false
          }

          if (
            data.code === 'invalid_username' ||
            data.code === 'application_passwords_disabled'
          ) {
            this.invalid_credentials = true
            return false
          }
        })
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  @apply w-full relative mb-5;
  label {
    @apply font-medium text-sm text-gray-600 mb-1 block;
  }
  input {
    @apply w-full border border-gray-500 bg-white  py-2 px-3 rounded-md text-gray-600;
    &:focus {
      @apply bg-gray-100 text-gray-800;
    }
    // @apply w-full rounded-md border-gray-400 border px-3 py-2 text-gray-700;
  }
  &.error {
    input {
      @apply border-red-500;
    }
  }
  &.last {
    @apply mb-0;
  }
}
.server-error {
  @apply absolute text-sm left-0 text-red-500;
  transform-origin: top;
  transition: all 0.2s;
  bottom: 10px;
}
.has-error {
  @apply pt-px absolute right-0 text-sm text-red-500;
  transform-origin: top;
  transition: all 0.2s;
}

.skew-enter,
.skew-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>