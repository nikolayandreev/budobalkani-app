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
            <span class="mr-1 text-sm text-gray-600">Обратно към</span>
            <nuxt-link
              class="text-sm font-medium text-blue-600 transition-all duration-200 border-b border-transparent hover:text-blue-700 hover:border-blue-600"
              to="/vhod"
              title="Влез в акаунта си"
              >Вход</nuxt-link
            >
          </div>
        </div>
        <div class="relative px-5 py-4 sm:py-6 sm:px-12">
          <div
            class="mb-3 form-group xs:mb-5"
            :class="status($v.passwordForm.password)"
          >
            <label for="real-password">Парола</label>
            <input
              id="real-password"
              type="password"
              v-model="$v.passwordForm.password.$model"
              placeholder="Въведи парола..."
              autocomplete="new-password"
            />
            <transition name="skew">
              <div
                class="has-error"
                v-if="
                  $v.passwordForm.password.$invalid &&
                  $v.passwordForm.password.$dirty
                "
              >
                Въведи поне 8 символа
              </div>
            </transition>
          </div>
          <div
            class="mb-3 form-group xs:mb-5"
            :class="status($v.passwordForm.password_confirmed)"
          >
            <label for="real-password-confirmed">Потвърди паролата</label>
            <input
              id="real-password-confirmed"
              type="password"
              v-model="$v.passwordForm.password_confirmed.$model"
              placeholder="Потъврди паролата..."
              autocomplete="new-password"
            />
            <transition name="skew">
              <div
                class="has-error"
                v-if="
                  !$v.passwordForm.password_confirmed.sameAsPassword &&
                  $v.passwordForm.password_confirmed.$dirty
                "
              >
                Паролите не съвпадат
              </div>
            </transition>
          </div>
          <transition name="skew">
            <div class="w-full text-center server-error" v-if="data_mismatch">
              Линка е изтекъл или има промени по данните!
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

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
      pending: false,
      data_mismatch: false,
      passwordForm: {
        password: '',
        password_confirmed: '',
      },
    }
  },
  validations: {
    passwordForm: {
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmed: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  watch: {
    savedEmail(val) {
      this.data_mismatch = false
    },
    savedCode(val) {
      this.data_mismatch = false
    },
  },
  validate({ query }) {
    return query.email && query.code
  },
  methods: {
    onSubmit() {
      this.$v.passwordForm.$touch()
      if (this.$v.passwordForm.$invalid) {
        this.pending = false
      } else {
        this.pending = true
        this.data_mismatch = false
        this.changePassword()
      }
    },
    async changePassword() {
      return await this.$axios
        .$post('/wp-json/bdpwr/v1/validate-code', {
          email: this.$route.query.email,
          code: this.$route.query.code,
        })
        .then((res) => {
          return this.$axios
            .$post('/wp-json/bdpwr/v1/set-password', {
              email: this.$route.query.email,
              code: this.$route.query.code,
              password: this.passwordForm.password,
            })
            .then((res) => {
              this.$route.push('/vhod')
            })
        })
        .catch((err) => {
          this.data_mismatch = true
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
