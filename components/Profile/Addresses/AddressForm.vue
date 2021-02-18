<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-5 grid-cols-2">
      <div class="form-group" :class="status($v.addressForm.first_name)">
        <label for="firstName">Име</label>
        <input
          id="firstName"
          type="text"
          v-model="$v.addressForm.first_name.$model"
          placeholder="Въведи първо име..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="
              $v.addressForm.first_name.$invalid &&
              $v.addressForm.first_name.$dirty
            "
          >
            Моля въведи Име
          </div>
        </transition>
      </div>
      <div class="form-group" :class="status($v.addressForm.last_name)">
        <label for="lastName">Фамилия</label>
        <input
          id="lastName"
          type="text"
          v-model="$v.addressForm.last_name.$model"
          placeholder="Въведи фамилия..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="
              $v.addressForm.last_name.$invalid &&
              $v.addressForm.last_name.$dirty
            "
          >
            Моля въведи Фамилия
          </div>
        </transition>
      </div>
    </div>
    <div class="block">
      <div class="form-group" :class="status($v.addressForm.phone)">
        <label for="phone">Телефон</label>
        <input
          id="phone"
          type="tel"
          v-model="$v.addressForm.phone.$model"
          placeholder="Въведи телефон..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="$v.addressForm.phone.$invalid && $v.addressForm.phone.$dirty"
          >
            Моля въведи Телефон
          </div>
        </transition>
      </div>
    </div>
    <div class="block">
      <div class="form-group" :class="status($v.addressForm.address1)">
        <label for="address1">Адрес</label>
        <input
          id="address1"
          type="text"
          v-model="$v.addressForm.address1.$model"
          placeholder="Пример: улица, блок, вход, квартал др..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="
              $v.addressForm.address1.$invalid && $v.addressForm.address1.$dirty
            "
          >
            Моля въведи допълнения към адреса
          </div>
        </transition>
      </div>
    </div>
    <div class="grid gap-5 grid-cols-2">
      <div class="form-group" :class="status($v.addressForm.city)">
        <label for="city">Град</label>
        <select id="city" v-model="$v.addressForm.city.$model">
          <option value="София">София</option>
          <option value="Варна">Варна</option>
          <option value="Бургас">Бургас</option>
        </select>
        <transition name="skew">
          <div
            class="has-error"
            v-if="$v.addressForm.city.$invalid && $v.addressForm.city.$dirty"
          >
            Моля избери град
          </div>
        </transition>
      </div>
      <div class="form-group" :class="status($v.addressForm.postcode)">
        <label for="postcode">Пощенски код</label>
        <input
          id="postcode"
          type="tel"
          v-model="$v.addressForm.postcode.$model"
          placeholder="Въведи пощенски код..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="
              $v.addressForm.postcode.$invalid && $v.addressForm.postcode.$dirty
            "
          >
            Моля въведи пощенски код
          </div>
        </transition>
      </div>
    </div>
    <div class="block">
      <div class="font-medium text-sm text-gray-600 mb-1 block">
        <input
          id="isDefault"
          type="checkbox"
          v-model="$v.addressForm.is_default.$model"
        />
        <label for="isDefault" class="text-sm">Предпочитан Адрес</label>
      </div>
      <div class="font-medium text-sm text-gray-600 mb-1 block">
        <input
          id="hasCompany"
          type="checkbox"
          v-model="$v.addressForm.has_company.$model"
        />
        <label for="hasCompany" class="text-sm"> Данни за фирма </label>
      </div>
    </div>
    <div class="grid gap-5 grid-cols-2" v-if="addressForm.has_company">
      <div class="form-group" :class="status($v.addressForm.company_name)">
        <label for="companyName">Име на фирма</label>
        <input
          id="companyName"
          type="text"
          v-model="$v.addressForm.company_name.$model"
          placeholder="Въведи име на фирма..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="
              $v.addressForm.company_name.$invalid &&
              $v.addressForm.company_name.$dirty
            "
          >
            Моля въведи име на фирмата
          </div>
        </transition>
      </div>
      <div class="form-group" :class="status($v.addressForm.vat_id)">
        <label for="vatId">Номер по ДДС</label>
        <input
          id="vatId"
          type="text"
          v-model="$v.addressForm.vat_id.$model"
          placeholder="Въведи номер по ДДС..."
        />
        <transition name="skew">
          <div
            class="has-error"
            v-if="
              $v.addressForm.vat_id.$invalid && $v.addressForm.vat_id.$dirty
            "
          >
            Моля въведи номер по ДДС
          </div>
        </transition>
      </div>
    </div>

    <button
      :disabled="pending"
      :class="{ pending: pending }"
      type="submit"
      class="flex flex-row flex-wrap items-center justify-center w-full py-3 mt-2 text-lg font-semibold text-gray-300 transition-all duration-200 outline-none focus:outline-none rounded-md hover:text-white bg-blue-accent hover:bg-blue-hover"
    >
      {{ action === 'edit' ? 'Запази промените' : 'Създай нов адрес' }}
    </button>
  </form>
</template>

<script>
import {
  required,
  sameAs,
  requiredIf,
  minLength,
} from 'vuelidate/lib/validators'
import { validPhone } from '~/plugins/custom-validators'

export default {
  props: {
    address: {
      required: false,
    },
    action: {
      required: true,
    },
  },
  data() {
    return {
      pending: false,
      companyInfoToggle: false,
      addressForm: {
        phone: null,
        first_name: null,
        last_name: null,
        address1: null,
        country: 'BG',
        city: null,
        postcode: null,
        is_default: false,
        has_company: false,
        company_name: null,
        vat_id: null,
      },
    }
  },
  validations: {
    addressForm: {
      phone: {
        required,
        validPhone: validPhone,
      },
      first_name: {
        required,
        minLength: minLength(3),
      },
      last_name: {
        required,
        minLength: minLength(3),
      },
      country: {
        sameAs: sameAs(() => 'BG'),
      },
      city: {
        required,
      },
      address1: {
        required,
      },
      postcode: {},
      is_default: {},
      has_company: {},
      company_name: {
        required: requiredIf(function () {
          return this.has_company
        }),
      },
      vat_id: {
        required: requiredIf(function () {
          return this.has_company
        }),
      },
    },
  },
  created() {
    if (this.address && this.action === 'edit') {
      for (let key in this.addressForm) {
        this.addressForm.has_company =
          this.address.company_name && this.address.vat_id

        if (key === 'address1') {
          this.addressForm.address1 = this.address.address1[
            this.address.address1.length - 1
          ]
        } else {
          this.addressForm[key] = this.address[key]
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.pending = true
      this.$v.addressForm.$touch()
      if (this.$v.addressForm.$invalid) {
        this.pending = false
      } else {
        return this.saveAddress()
      }
    },
    async saveAddress() {
      let defaultAddress
      if (this.addressForm.is_default) {
        defaultAddress = {
          default_address: this.addressForm.is_default,
        }
      }

      return await this.$axios({
        method: this.action === 'edit' ? 'PUT' : 'POST',
        url: `/api/addresses/${
          this.action === 'edit' ? this.$route.params.id : 'create'
        }?token=true`,
        data: {
          first_name: this.addressForm.first_name,
          last_name: this.addressForm.last_name,
          phone: this.addressForm.phone,
          address1: [this.addressForm.address1],
          country: 'BG',
          state: 'SF',
          city: this.addressForm.city,
          postcode: this.addressForm.postcode,
          company_name: this.addressForm.has_company
            ? this.addressForm.company_name
            : null,
          vat_id: this.addressForm.has_company ? this.addressForm.vat_id : null,
          ...defaultAddress,
        },
      })
        .then((res) => {
          this.$nuxt.$emit('updated-address')
          this.pending = false
          this.$router.push('/profile/adresi')
        })
        .catch((err) => {
          console.error(err)
          this.pending = false
        })
    },
    status(validation) {
      return {
        error: validation ? validation.$error : null,
        dirty: validation ? validation.$dirty : null,
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
.system-error {
  @apply absolute text-sm left-0 text-red-500;
  transform-origin: top;
  transition: all 0.2s;
  bottom: 5px;
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
