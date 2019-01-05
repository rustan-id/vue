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
        label="Адрес электропочты"
        id="email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        label="Пароль"
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
             Войти
      </button>

      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        Неверный адрес или пароль.
      </v-alert>
    </v-form>
    <span @click="forgotPass" class="forgot__question">Забыли пароль?</span>
    <p v-if="forgot">Введите привязанную к профилю электропочту, мы отправим Вам письмо со ссылкой для восстановления.</p>
    <v-text-field
        type="email"
        :rules="emailRules"
        label="Адрес электропочты"
        v-if="forgot"
        v-model='email'
        required
        >
    </v-text-field>
    <button v-if="forgot"
            @click="resetPass"
            class="city__btn"
            >
          Отправить
    </button>

    <v-alert
      dismissible
      error
      :value="true"
      v-if="resetError"
      >
      Неверный адрес электропочты
    </v-alert>
    <v-alert
      dismissible
      type="success"
      :value="true"
      v-if="sent"
      >
      На указанную электропочту отправлена ссылка для восстановления пароля
    </v-alert>

    <!-- <form @submit.prevent = "onSubmit"
          method="post"
          action=""
          class="signin__form">
      <label for="email">Адрес электропочты</label>
      <input type="email"
             placeholder="ivanov@gmail.com"
             id="email"
             class="smeta__mail"
             v-model='email'
             minlength="10"
             >
      <label for="password">Пароль</label>
      <input type="password"
             placeholder="password"
             id="password"
             class="smeta__password"
             v-model='password'
             minlength="1"
             >
      <p class="error" v-if="errors.length">
        <b>Заполните, пожалуйста, недостающие поля:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <button type="submit"
              class="button button--details"
              >
              <router-link to="/donors-shetinina">
              Войти(список)
              </router-link>
      </button>
    </form> -->

  </div>
</template>

<script>
  // import firebase from 'firebase'
  // import store from "../../store/store"
  // import Vuex from "vuex"
  // import axios from '../../axios-auth'

  // import {mapActions} from "vuex";
  export default {
    data() {
      return {

        forgot: false,
        password: '',
        hidePassword: true,
        valid: true,
        donation: null,
        passwordRules: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 6) || 'Минимальное количество символов - 6'
        ],
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => /.+@.+/.test(v) || 'Некорректный адрес электропочты',
          v => (v && v.length >= 8) || 'Минимальное количество символов - 8'
        ],
        errors: [],
        email: '',
        submitStatus: null
      }
    },

    computed: {
      user() {
        return this.$store.getters.isAuthenticated
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
      resetError() {
        return this.$store.getters.resetError
        // return this.$store.state.resetError
      },
      sent() {
        return this.$store.getters.success
      }
    },

    // watch: {
    //   user (value) {
    //     if (value !== null && value !== undefined) {
    //       this.$router.push('/')
    //     }
    //   }
    // },


    // watch: {
    //   resetPass(resError) {
    //     resError = this.$store.state.resetError
    //     if (resError == null && resError == undefined) {
    //       this.sent = true
    //     }
    //   }
    // },
    methods: {
      forgotPass() {
        this.forgot = !this.forgot
      },
      resetPass() {
        // this.forgot = !this.forgot
        const email = this.email
        this.$store.dispatch('resetPassword', email)

      },



      onDismissed() {
        // console.log('dismissed')
        this.$store.dispatch('clearError')
      },
      onSubmit() {
        // this.isShown = true;
        // this.isShow = false;
        const formData = {
          // donation: this.donation,
         //  pseudo: this.pseudo,
         //  tel: this.tel,
          email: this.email,
          password: this.password
          // confirmPassword: this.confirmPassword,
        }
        console.log(formData)
        this.$store.dispatch('login', {email: formData.email, password: formData.password})
        // .then(auth => {
        //     alert("logged");
        //     this.$router.go({path: this.$router.path})
        //   }
        // );

        // const isAuth = this.auth;
      }
    },

  };


        // axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        //   email: formData.email,
        //   password: formData.password,
        //   returnSecureToken: true
        // })
         //  .then(res => console.log(res))
         //  .catch(error => console.log(error))



        // this.errors = [];
        // let errors = this.errors;

        // let donation = this.list.donation;
        // let pseudo = this.list.pseudo;
        // let tel = this.list.tel;
        // let mail = this.list.mail;
        // let password = this.list.password;

        // const data = {
          //   list: this.$store.getters.list
          // };


        // if (donation && pseudo && tel && mail && password) {
       //    return true,
       //    this.list.push({
        //     donation,
        //     pseudo,
        //     tel,
        //     mail,
        //     password
       //    }),

        //   this.$http.put('data.json', data);
       //  };

        // if (!mail) {
        //   errors.push('Адрес электропочты.');
        // }
        // if (!password) {
        //   errors.push('Пароль.');
        // }

</script>

<style lang="sass" scoped>
  h1
    margin-top: 100px
</style>
