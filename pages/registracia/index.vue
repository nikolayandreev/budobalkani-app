<template>
  <form
    @submit.prevent="onSubmit"
    autocomplete="nofill"
    class="w-full mx-5 xs:w-9/12 sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-4/12"
  >
    <input
      id="username"
      class="hidden"
      type="email"
      name="fakeusernameremembered"
    />
    <input
      id="password"
      class="hidden"
      type="password"
      name="fakepasswordremembered"
    />

    <div class="container">
      <div class="bg-white rounded-md shadowm-lg">
        <div class="px-5 pt-4 sm:px-12 sm:pt-8">
          <h1 class="text-xl font-semibold text-gray-700">
            Направи нов акаунт
          </h1>
          <div class="flex flex-row flex-wrap">
            <span class="mr-1 text-sm text-gray-600">Вече имаш акаунт?</span>
            <nuxt-link
              class="text-sm font-medium text-blue-600 transition-all duration-200 border-b border-transparent hover:text-blue-700 hover:border-blue-600"
              to="/vhod"
              title="Влез в акаунта си"
              >Влез</nuxt-link
            >
          </div>
        </div>
        <div class="px-5 py-4 sm:py-6 sm:px-12">
          <div class="grid grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div
              class="mb-3 form-group xs:mb-5"
              :class="status($v.registerForm.first_name)"
            >
              <label for="first_name">Име</label>
              <input
                id="first_name"
                type="text"
                v-model="$v.registerForm.first_name.$model"
                placeholder="Въведи име..."
              />
              <transition name="skew">
                <div
                  class="has-error"
                  v-if="
                    $v.registerForm.first_name.$invalid &&
                    $v.registerForm.first_name.$dirty
                  "
                >
                  Полето е задължително!
                </div>
              </transition>
            </div>
            <div
              class="mb-3 form-group xs:mb-5"
              :class="status($v.registerForm.last_name)"
            >
              <label for="last_name">Фамилия</label>
              <input
                id="last_name"
                type="text"
                v-model="$v.registerForm.last_name.$model"
                placeholder="Въведи фамилия..."
                autocomplete="nope"
              />
              <transition name="skew">
                <div
                  class="has-error"
                  v-if="
                    $v.registerForm.last_name.$invalid &&
                    $v.registerForm.last_name.$dirty
                  "
                >
                  Полето е задължително!
                </div>
              </transition>
            </div>
          </div>
          <div
            class="mb-3 form-group xs:mb-5"
            :class="status($v.registerForm.email)"
          >
            <label for="real-username">Email</label>
            <input
              id="real-username"
              type="text"
              v-model="$v.registerForm.email.$model"
              placeholder="Email адрес..."
              autocomplete="nope"
            />
            <transition name="skew">
              <div
                class="has-error"
                v-if="
                  $v.registerForm.email.$invalid && $v.registerForm.email.$dirty
                "
              >
                Моля въведи валиден Email адрес
              </div>
            </transition>
            <transition name="skew">
              <div class="has-error" v-if="email_in_use">
                Вече има акаунт регистриран с този Email адрес!
              </div>
            </transition>
          </div>
          <div class="grid grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div
              class="mb-3 form-group xs:mb-5"
              :class="status($v.registerForm.password)"
            >
              <label for="real-password">Парола</label>
              <input
                id="real-password"
                type="password"
                v-model="$v.registerForm.password.$model"
                placeholder="Въведи парола..."
                autocomplete="new-password"
              />
              <transition name="skew">
                <div
                  class="has-error"
                  v-if="
                    $v.registerForm.password.$invalid &&
                    $v.registerForm.password.$dirty
                  "
                >
                  Въведи поне 8 символа
                </div>
              </transition>
            </div>
            <div
              class="mb-3 form-group xs:mb-5"
              :class="status($v.registerForm.password_confirmation)"
            >
              <label for="real-password-confirmation">Потвърди паролата</label>
              <input
                id="real-password-confirmation"
                type="password"
                v-model="$v.registerForm.password_confirmation.$model"
                placeholder="Потъврди паролата..."
                autocomplete="new-password"
              />
              <transition name="skew">
                <div
                  class="has-error"
                  v-if="
                    !$v.registerForm.password_confirmation.sameAsPassword &&
                    $v.registerForm.password_confirmation.$dirty
                  "
                >
                  Паролите не съвпадат
                </div>
              </transition>
            </div>
          </div>
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
      pending: false,
      show_password_hint: false,
      email_in_use: false,
      server_error: false,
      registerForm: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  validations: {
    registerForm: {
      email: {
        required,
        email,
      },
      first_name: {
        required,
        minLength: minLength(3),
      },
      last_name: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  watch: {
    'registerForm.email': function (val) {
      this.email_in_use = false
    },
  },
  methods: {
    onSubmit() {
      this.$v.registerForm.$touch()
      if (this.$v.registerForm.$invalid) {
        this.pending = false
      } else {
        this.createCustomer()
      }
    },
    async createCustomer() {
      this.pending = true
      await this.$axios
        .$post('/api/customer/register', {
          ...this.registerForm,
          date_of_birth: null,
          gender: null,
        })
        .then((res) => {
          this.pending = false
          return this.$router.push('/vhod')
        })
        .catch((err) => {
          this.pending = false
          const data = err.response.data

          if (data.errors && data.errors.email) {
            this.email_in_use = true
            return false
          }

          this.server_error = true
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
  @apply w-full relative;
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
}

.has-error {
  @apply pt-px absolute right-0 text-xs text-red-500;
  transform-origin: top;
  transition: all 0.2s;
}

.skew-enter,
.skew-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
@media all and(max-width:480px) {
  .has-error {
    top: 95%;
  }
}
</style>
