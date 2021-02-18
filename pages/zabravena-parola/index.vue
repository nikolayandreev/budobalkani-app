<template>
  <form
    @submit.prevent="onSubmit"
    class="w-full mx-5 xs:w-8/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12"
  >
    <div class="container">
      <div class="bg-white rounded-md shadowm-lg">
        <div class="px-5 pt-4 sm:px-12 sm:pt-8">
          <h1 class="text-xl font-semibold text-gray-700">Възстанови парола</h1>
          <div class="flex flex-row flex-wrap">
            <span class="mr-1 text-sm text-gray-600"> Обратно към</span>
            <nuxt-link
              class="text-sm font-medium text-blue-600 transition-all duration-200 border-b border-transparent hover:text-blue-700 hover:border-blue-600"
              to="/vhod"
              title="Влез в акаунта си"
              >Вход</nuxt-link
            >
          </div>
        </div>
        <div v-if="!sentMail">
          <div class="relative px-5 py-4 sm:py-6 sm:px-12">
            <div class="form-group" :class="status($v.forgotPassword.email)">
              <label for="username">Email</label>
              <input
                id="username"
                type="text"
                v-model="$v.forgotPassword.email.$model"
                placeholder="Email адрес..."
              />
              <transition name="skew">
                <div
                  class="has-error"
                  v-if="
                    $v.forgotPassword.email.$invalid &&
                    $v.forgotPassword.email.$dirty
                  "
                >
                  Моля въведи валиден Email адрес
                </div>
              </transition>
            </div>
          </div>
          <button
            :disabled="pending"
            :class="{ pending: pending }"
            type="submit"
            class="flex flex-row flex-wrap items-center justify-center w-full py-3 mt-2 text-lg font-semibold text-gray-300 transition-all duration-200 outline-none focus:outline-none rounded-bl-md rounded-br-md hover:text-white bg-blue-accent hover:bg-blue-hover"
          >
            Възстанови паролата си
          </button>
        </div>
        <template v-if="sentMail">
          <div
            class="flex flex-row flex-wrap items-center justify-between px-5 py-4 sm:py-6 sm:px-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-20 h-auto mx-auto mb-4 xs:w-2/12 xs:mx-0 xs:my-0 text-blue-accent"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p
              class="w-full text-sm text-center text-gray-600 xs:pl-4 xs:text-left xs:w-10/12"
            >
              Ако намерим този Email адрес, ще изпратим код за потвърждение на
              него.
            </p>
          </div>
          <button
            type="submit"
            @click="sentMail = false"
            class="flex flex-row flex-wrap items-center justify-center w-full py-3 mt-2 text-lg font-semibold text-gray-300 transition-all duration-200 outline-none focus:outline-none rounded-bl-md rounded-br-md hover:text-white bg-blue-accent hover:bg-blue-hover"
          >
            Въведи друг Email адрес
          </button>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',
  validate({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      redirect('/profile')
    }

    return true
  },
  data() {
    return {
      sentMail: false,
      pending: false,
      invalid_credentials: false,
      server_error: false,
      forgotPassword: {
        email: '',
      },
    }
  },
  validations: {
    forgotPassword: {
      email: {
        required,
        email,
      },
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
      this.$v.forgotPassword.$touch()
      if (this.$v.forgotPassword.$invalid) {
        this.pending = false
      } else {
        this.sendMail()
      }
    },
    async sendMail() {
      this.pending = true
      this.invalid_credentials = false
      await this.$axios
        .$post(
          '/api/customer/forgot-password',
          {
            email: this.forgotPassword.email,
          },
          { progress: false }
        )
        .then((res) => {
          this.sentMail = true
          this.pending = false
        })
        .catch((err) => {
          this.sentMail = true
          this.pending = false
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
