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
        label="Сумма взноса"
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
        label="Выберите проект"
        required>
      </v-select>
      <p v-if="selected === 'Baker Street, 221b'">В проект "Baker Street, 221b" осталось собрать
        {{ restDonation(smetaBaker, usersBaker) }} &#8364;
      </p>
      <p v-if="selected === 'School №53'">В проект "School №53" осталось собрать
        {{ restDonation(smetaSchool, usersSchool) }} &#8364;
      </p>
      <v-text-field
        type="text"
        label="Псевдоним"
        :rules="pseudoRules"
        placeholder="Valeriy Petrovich"
        id="pseudo"
        class="smeta__pseudo"
        v-model='pseudo'
        title="Псевдоним будет указан в публичном списке участников, для Вашего контроля сбора средств"
        required>
      </v-text-field>
      <v-text-field
        type="number"
        label="Номер Телефона"
        :rules="telRules"
        id="tel"
        class="smeta__tel"
        v-model='tel'
        >
      </v-text-field>
      <v-text-field
        type="email"
        :rules="emailRules"
        label="Адрес электропочты"
        id="email"
        class="smeta__email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        label="Пароль"
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
          Принимаю условия
          <v-tooltip bottom>
            <a slot="activator" target="_blank" href="http://vuetifyjs.com" @click.stop>Пользовательского соглашения</a>
            Откроется в новом окне
          </v-tooltip>
        </div>
      </v-checkbox>
      <div v-if="modalSignup">Спасибо за участие! Ваш запрос отправлен менеджеру.</div>
      <button
             :disabled="!valid || !terms"
             type="submit"
             class="city__btn"
             >
        забронировать взнос
      </button>
      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        Проверьте правильность заполнения формы, вероятно, Вы указали зарегистрированную ранее электропочту
      </v-alert>
      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="!valid"
        >
        Проверьте правильность заполнения формы, вероятно, Вы не приняли условия пользовательского соглашения
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
          v => !!v || 'Обязательное поле'
        ],
        donRules: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 2) || 'Minimal donation - 10 &#8364;'
        ],
        passwordRules: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 6) || 'Минимальное количество символов - 6'
        ],
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => /.+@.+/.test(v) || 'Некорректный адрес электропочты',
          v => (v && v.length >= 8) || 'Минимальное количество символов - 8'
        ],
        switchRules: [
          v => !!v || ''
        ],
        // invalid: false,
        selected: '',
        options: ['Baker Street, 221b', 'School №53'],
        telRules: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 10) || 'Минимальное количество цифр номера - 10',
          v => (v && v.length <= 12) || 'Максимальное количество цифр номера - 12'
        ],
        terms: false,
        errors: [],
        projects: '',
        pseudo: '',
        tel: null,
        email: '',
        smetaBaker: [],
        smetaSchool: [],
        modalSignup: false,
        submitStatus: null
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
        console.log('dismissed')
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
        // const donationData = {
        //   donation,
        //   pseudo
        // }
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
      loading () {
        return this.$store.getters.loading
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



<!-- // validations: {
    //   email: {
    //     required,
    //     email,
    //     unique: val => {
    //       if (val === "") return true
    //       return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
    //       .then(res => {
    //         return Object.keys(res.data).length === 0
    //       })
    //     }
    //   },
    //   // donation: {
    //   //   required,
    //   //   numeric,
    //   //   minVal: minValue(100)
    //   // },
    //   pseudo: {
    //     required,
    //     minLen: minLength(3),
    //     maxLen: maxLength(20)
    //   },
    //   password: {
    //     required,
    //     minLen: minLength(6)
    //   },
    //   projects: {
    //     required
    //   },
    //   terms: {
    //     required
    //   },
    //   tel: {
    //     required,
    //     minLen: minLength(10),
    //     maxLen: maxLength(12)
    //   }
    // },
    // created () {
   //    this.$store.dispatch('storeUser')
   //  },   -->

<!-- <v-form @submit.prevent = "onSubmit"
          id="signup"
          v-model="valid"
          lazy-validation
          method="post"
          action="/submit"
          class="signup"> -->
      <!-- <div class="input" :class="{invalid: $v.donation.$error}"> -->
        <!-- <label for="donation">Сумма взноса</label>   -->
        <!-- <v-text-field
           type="number"
           :rules="nameRules"
           label="Сумма взноса"
           id="donation"
           class="smeta__donate"
           v-model='donation'>
        </v-text-field> -->
        <!-- <p class="signup__error" v-if="!$v.donation.minVal">Минимальный взнос - {{ $v.donation.$params.minVal.min }} рублей</p>
        <p class="signup__error" v-if="!$v.donation.$invalid">Вау</p> -->
      <!-- </div> -->


      <!-- <div class="input">   -->
        <!-- <v-select
          v-model="selected"
          :items="options"
          label="Выберите проект">
        </v-select> -->
        <!-- <p v-if="selected === 'Shetinina-17'">В проект Shetinina-17 осталось собрать {{ restCost }} рублей </p>       -->
      <!-- </div> -->

      <!-- <div class="input">   -->
        <!-- <v-text-field
            type="text"
            label="Псевдоним"
            placeholder="Valeriy Petrovich"
            id="pseudo"
            class="smeta__pseudo"
            v-model='pseudo'
            title="Псевдоним будет указан в публичном списке участников, для Вашего контроля сбора средств"
            minLength="3"
            >
        </v-text-field>   -->
        <!-- <p class="signup__error" v-if="!$v.pseudo.minLen">Минимальное количество символов - {{$v.pseudo.$params.minLen.min}} </p>
        <p class="signup__error" v-if="!$v.pseudo.maxLen">Максимальное количество символов - {{$v.pseudo.$params.maxLen.max}} </p>  -->
      <!-- </div> -->
      <!-- <div class="input" :class="{invalid: $v.tel.$error}">   -->
        <!-- <v-text-field
               type="number"
               label="Номер Телефона"
               id="tel"
               class="smeta__tel"
               v-model.number='tel'
               >
        </v-text-field> -->
        <!-- <p class="signup__error" v-if="!$v.tel.minLen">Минимальное количество цифр - {{$v.tel.$params.minLen.min}} </p>
        <p class="signup__error" v-if="!$v.tel.maxLen">Максимальное количество цифр - {{$v.tel.$params.maxLen.max}} </p>  -->
      <!-- </div> -->
      <!-- <div class="input" :class="{invalid: $v.email.$error}"> -->
        <!-- <v-text-field
               type="email"
               label="Адрес электропочты"
               id="email"
               class="smeta__email"
               v-model='email'
               >
        </v-text-field> -->
       <!--  <p class="signup__error" v-if="!$v.email.email">Некорректный адрес электропочты</p>  -->
        <!-- <p class="signup__error" v-if="!$v.email.required">Обязательное поле для заполнения</p> -->

        <!-- <p class="signup__error" v-if="!$v.email.$unique">Этот адрес уже используется</p>  -->
      <!-- </div>       -->

      <!-- <div class="input" :class="{invalid: $v.password.$error}"> -->
        <!-- <v-text-field
               type="password"
               label="Пароль"
               id="password"
               class="smeta__password"

               v-model='password'
               >
        </v-text-field>   -->
        <!-- <p class="signup__error" v-if="!$v.password.minLen">Минимальное количество символов - 6 </p>    -->
      <!-- </div>  -->

      <!-- <div class="input" :class="{invalid: $v.terms.$error}"> -->
        <!-- <v-switch  color="green"
              id="terms"
              v-model="terms"
              class="smeta__terms"
            >
            <div slot="label">
              Принимаю условия
              <v-tooltip bottom>
                <a slot="activator" target="_blank" href="http://vuetifyjs.com" @click.stop>Пользовательского соглашения</a>
                Откроется в новом окне
              </v-tooltip>
            </div>
        </v-switch>      -->
      <!-- </div>  -->
      <!-- <div v-if="modalSignup">Спасибо за участие! Ваш запрос отправлен менеджеру.</div>
      <v-btn
             :disabled="!valid"
             type="submit"
             >
        забронировать взнос
      </v-btn> -->
      <!-- <p class="typo__p" v-if="$v.$invalid">Please fill the form correctly.</p> -->
    <!-- </v-form>   -->


        <!-- // this.$store.dispatch('signUserUp', donationData)

      //   this.$v.$touch()
       //  if (this.$v.$invalid) {
       //    this.submitStatus = 'error'
       //  } else {
       //    // do your submit logic here
       //    this.submitStatus = 'pending'
       //    setTimeout(() => {
       //      this.submitStatus = 'ok'
       //    }, 500)
       //  }

  //

  //       if (donation && pseudo && email && password) {
  //         return true,
  //         this.modalSignup = true
  //       }

  //       this.errors = [];
  //       let errors = this.errors;

   //      if (!donation) {
   //        errors.push('Сумма взноса.');
   //      }
   //      if (!pseudo) {
   //        errors.push('Псевдоним участника.');
   //      }

   //      if (!email ) {
   //        errors.push('Адрес электропочты.');
   //      }
   //      if (email.message === "EMAIL_EXISTS" ) {
   //        errors.push('Почта существует');
   //      }
   //      if (!password) {
   //        errors.push('Пароль.');
   //      }
   //    }
   //  }
  // }; -->
