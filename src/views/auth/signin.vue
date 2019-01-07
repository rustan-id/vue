<template>
  <div class="signin">
    <h1>Sign in</h1>
    <v-form @submit.prevent = "onSubmit"
      v-model="valid"
      method="post"
      action="/submit"
      lazy-validation
     >
      <v-text-field
        type="email"
        :rules="emailRules"
        label="Email"
        id="email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        label="Password"
        id="password"
        v-model='password'
        :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
        @click:append="hidePassword = !hidePassword"
        required>
      </v-text-field>

      <button :disabled="!valid"
               type="submit"
               class="city__btn"
               tag="button">
             Sign in
      </button>

      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        Enter a valid email address and password
      </v-alert>
    </v-form>
    <span @click="forgotPass" class="forgot__question">Forgot your password?</span>
    <p v-if="forgot">Enter the email address associated with your account, we will send to you recovery link</p>
    <v-text-field
        type="email"
        :rules="emailRules"
        label="Email"
        v-if="forgot"
        v-model='email'
        required
        >
    </v-text-field>
    <button v-if="forgot"
            @click="resetPass"
            class="city__btn"
            >
          Send
    </button>

    <v-alert
      dismissible
      error
      :value="true"
      v-if="resetError"
      >
      We're sorry. We weren't able to identify you given the information provided.
    </v-alert>
    <v-alert
      dismissible
      type="success"
      :value="true"
      v-if="sent"
      >
      Recovery link is sent to your email adress
    </v-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        forgot: false,
        password: '',
        hidePassword: true,
        valid: true,
        donation: null,
        passwordRules: [
          v => !!v || 'Enter your password',
          v => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ],
        emailRules: [
          v => !!v || 'Enter your email',
          v => /.+@.+/.test(v) || 'Enter a valid email address',
          v => (v && v.length >= 8) || 'Enter a valid email address'
        ],
        errors: [],
        email: ''
      }
    },
    methods: {
      forgotPass() {
        this.forgot = !this.forgot
      },
      resetPass() {
        const email = this.email
        this.$store.dispatch('resetPassword', email)
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      },
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password
        }
        console.log(formData)
        this.$store.dispatch('login', {email: formData.email, password: formData.password})
      }
    },
    computed: {
      user() {
        return this.$store.getters.isAuthenticated
      },
      error() {
        return this.$store.getters.error
      },
      passwordType() {
        return this.hidePassword ? 'password' : 'text'
      },
      resetError() {
        return this.$store.getters.resetError
      },
      sent() {
        return this.$store.getters.success
      }
    }
  };
</script>

<style lang="sass" scoped>
</style>
