<template>
  <div class="signup">
    <h1>Sign up</h1>
    <v-form @submit.prevent = "onSubmit"
      ref="form"
      id="signup"
      v-model="valid"
      lazy-validation
      method="post"
      action="/submit"
      >
      <v-text-field
        type="number"
        :rules="donRules"
        label="Donation amount"
        id="donation"
        class="smeta__donate"
        v-model='donation'
        required>
      </v-text-field>
      <v-select
        v-model="selected"
        id="selected"
        @input="fetchDonations"
        :items="options"
        label="Select the project"
        required>
      </v-select>
      <p v-if="selected === 'Baker Street'">The project "Baker Street" demands
        {{ restDonation(smetaBaker, usersBaker) }} &#8364; more
      </p>
      <p v-if="selected === 'School №53'">The project "School №53" demands
        {{ restDonation(smetaSchool, usersSchool) }} &#8364; more
      </p>
      <v-text-field
        type="text"
        label="Nickname"
        :rules="pseudoRules"
        placeholder="Eric"
        id="pseudo"
        class="smeta__pseudo"
        v-model='pseudo'
        title="Nickname will be given in the public list of participants, for your process controllling"
        required>
      </v-text-field>
      <v-text-field
        type="number"
        label="Mobile Phone Number"
        :rules="telRules"
        id="tel"
        class="smeta__tel"
        v-model='tel'
        >
      </v-text-field>
      <v-text-field
        type="email"
        :rules="emailRules"
        label="Email"
        id="email"
        class="smeta__email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        label="Password"
        id="password"
        class="smeta__password"
        v-model='password'
        :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
        @click:append="hidePassword = !hidePassword"
        required>
      </v-text-field>
      <v-checkbox  color="green"
        id="terms"
        v-model="terms"
        :rules="switchRules"

        class="smeta__terms"
        required>
        <div slot="label">
          I agree to City's
          <v-tooltip bottom>
            <a slot="activator" target="_blank" href="http://vuetifyjs.com" @click.stop>Conditions of Use and Privacy Notice</a>
            will be opened in a new window
          </v-tooltip>
        </div>
      </v-checkbox>
      <button
             :disabled="!valid || !terms"
             type="submit"
             class="city__btn"
             >
        book donation
      </button>
      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        Provided email adress has already been added into the database
      </v-alert>
      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="!valid"
        >
        Check your fill in, you might not have agreed Conditions of Use and Privacy Notice
      </v-alert>
    </v-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: '',
        hidePassword: true,
        valid: false,
        donation: null,
        pseudoRules: [
          v => !!v || 'Enter your nickname'
        ],
        donRules: [
          v => !!v || 'Enter donation amount',
          v => (v && v.length >= 2) || 'Minimal donation - 10 &#8364;'
        ],
        passwordRules: [
          v => !!v || 'Enter your password',
          v => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ],
        emailRules: [
          v => !!v || 'Enter your email',
          v => /.+@.+/.test(v) || 'Enter a valid email address',
          v => (v && v.length >= 8) || 'Enter a valid email address'
        ],
        switchRules: [
          v => !!v || ''
        ],
        // invalid: false,
        selected: '',
        options: ['Baker Street', 'School №53'],
        telRules: [
          v => !!v || 'Enter mobile phone number',
          v => (v && v.length >= 10) || 'Number must be at least 10 characters',
          v => (v && v.length <= 12) || 'Number must be at least 12 characters'
        ],
        terms: false,
        errors: [],
        projects: '',
        pseudo: '',
        tel: null,
        email: '',
        smetaBaker: [],
        smetaSchool: []
      }
    },
    methods: {
      gotDonations(donations) {
        let sumDonations = null
        for (let i = 0; i < donations.length; i++ ) {
          sumDonations = sumDonations + Number(donations[i].donation)
        }
        return sumDonations
      },
      needDonations(smeta) {
        let needSum = null
        let sum = null
        for (let i = 0; i < smeta.length; i++ ) {
          sum = sum + smeta[i].num * smeta[i].price
        }
        needSum = sum + sum * 0.1
        return needSum
      },
      restDonation(smeta, donations) {
        let need = this.needDonations(smeta)
        let sum = this.gotDonations(donations)
        let rest = need - sum
        return rest
      },
      fetchDonations() {
        this.$store.dispatch('fetchDonations')
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      },
      onSubmit() {
        const donation = this.donation;
        const pseudo = this.pseudo;
        const tel = this.tel;
        const email = this.email;
        const password = this.password;
        const selected = this.selected;
        const formData = {
          donation,
          pseudo,
          tel,
          email,
          password,
          selected
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      passwordType() {
        return this.hidePassword ? 'password' : 'text'
      },
      usersBaker() {
        return this.$store.getters.usersBaker
      },
      usersSchool() {
        return this.$store.getters.usersSchool
      }
    },
    created() {
      this.$store.dispatch('initSmeta')
      this.smetaBaker = this.$store.getters.smetaBaker
      this.smetaSchool = this.$store.getters.smetaSchool
    }
  };
</script>

<style lang="sass" scoped>
</style>
