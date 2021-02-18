<template>
  <div class="w-5/6 px-16 py-10 bg-white rounded-md shadow-md">
    <form @submit.prevent="onSubmit">
      <div class="grid grid-cols-2 gap-5">
        <div class="form-group" :class="status($v.profileForm.first_name)">
          <label for="firstName">Име</label>
          <input
            id="firstName"
            type="text"
            v-model="$v.profileForm.first_name.$model"
            placeholder="Въведи първо име..."
          />
        </div>
        <div class="form-group" :class="status($v.profileForm.last_name)">
          <label for="lastName">Фамилия</label>
          <input
            id="lastName"
            type="text"
            v-model="$v.profileForm.last_name.$model"
            placeholder="Въведи фамилия..."
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="form-group" :class="status($v.profileForm.date_of_birth)">
          <label for="birthDate">Дата на раждане</label>
          <input
            id="birthDate"
            type="date"
            v-model="$v.profileForm.date_of_birth.$model"
          />
        </div>
        <div class="form-group" :class="status($v.profileForm.gender)">
          <label for="gender">Пол</label>
          <select id="gender" v-model="$v.profileForm.gender.$model">
            <option value="Male">Мъж</option>
            <option value="Female">Жена</option>
          </select>
        </div>
      </div>

      <button
        :disabled="pending"
        :class="{ pending: pending }"
        type="submit"
        class="flex flex-row flex-wrap items-center justify-center w-full py-3 mt-2 text-lg font-semibold text-gray-300 transition-all duration-200 rounded-md outline-none focus:outline-none hover:text-white bg-blue-accent hover:bg-blue-hover"
      >
        Запази промените
      </button>
    </form>
  </div>
</template>

<script>
import {
  required,
  sameAs,
  requiredIf,
  minLength,
} from 'vuelidate/lib/validators'

export default {
  layout: 'profile',
  data() {
    return {
      pending: false,
      profileForm: {
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth: null,
      },
    }
  },
  validations: {
    profileForm: {
      first_name: {
        required,
        minLength: minLength(3),
      },
      last_name: {
        required,
        minLength: minLength(3),
      },
      gender: {},
      date_of_birth: {},
    },
  },
  methods: {
    onSubmit() {
      this.pending = true
      this.$v.profileForm.$touch()
      if (this.$v.profileForm.$invalid) {
        this.pending = false
      } else {
        return this.editCustomer()
      }
    },
    async editCustomer() {
      await this.$axios
        .$put(`/api/customer/profile`, this.profileForm)
        .then((res) => {
          this.$nuxt.$emit('user-changed')
          this.pending = false
          this.$router.push('/profile')
        })
        .catch((err) => {
          console.error(err)
          this.pending = false
        })
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      }
    },
    setUserValues(user) {
      this.profileForm.first_name = user.first_name
      this.profileForm.last_name = user.last_name
      this.profileForm.gender = user.gender
      this.profileForm.date_of_birth = user.date_of_birth
    },
  },
  watch: {
    user(val) {
      this.setUserValues(val)
    },
  },
  created() {
    if (Object.keys(this.user).length) {
      this.setUserValues(this.user)
    }
  },
  computed: {
    user() {
      return this.$auth.user
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
  }
  select {
    @apply w-full border border-gray-500 bg-white py-2 px-3 rounded-md text-gray-600;
    &:focus {
      @apply bg-gray-100 text-gray-800;
    }
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
</style>