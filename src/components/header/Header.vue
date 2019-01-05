<template>
  <!-- <v-app> -->
    <header class="header"  >
      <div class="header__top">
        <router-link to="/">
          <app-logo></app-logo>
        </router-link>
        <!-- <router-link to="/pagesmeta">
          <h1>Smeta</h1>
        </router-link> -->
        <nav >
          <ul>
            <li @click="showContacts"
                >
            Контакты
            </li>
            <router-link to="/signin"
                         tag="li"
                         v-if="!cusers"
                         >
            Войти
            </router-link>
            <router-link to="/signup"
                         tag="li"
                         v-if="!cusers"
                         >
            Регистрация
            </router-link>
            <router-link to="/donors"
                         tag="li"
                         v-if="cusers"
                         >
            Участники
            </router-link>
            <li v-if="cusers"
                @click="onLogout"
                >
            Выйти
            </li>
          </ul>
        </nav>
        <!-- <links @show-contacts="showContacts"></links> -->
      </div>

      <contacts :class="{contacts__show: isActive}"></contacts>
    </header>
  <!-- </v-app>   -->

</template>

<!-- <button v-if="auth">Выйти</button> -->

<script>
  // import Logo from './Logo.vue'
  // import Links from './Links.vue'
  // import Contacts from './Contacts.vue'
  // import signup from '../../views/auth/signup.vue'
  // import signin from '../../views/auth/signin.vue'
  // import firebase from 'firebase'
  // import store from "../../store/store.js"
  export default {
    // components: {
    //   Logo,
    //   Links,
    //   Contacts,
    //   signin,
    //   signup
    // },
    data () {
      return {
        isActive: false,
        // isAuth: true
        // auth: false
      }
    },
    // computed: {
    //     auth() {
    //       return this.$store.getters.isAuthenticated
    //       // return this.$store.state.idToken
    //     }
    // },
    computed: {
      // auth() {
      //   return this.$store.getters.isAuthenticated
      // },
      cusers () {
        return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
      }
    },
    methods: {
      showContacts() {
        this.isActive = !this.isActive;
      },
      onLogout() {
        this.$store.dispatch('logout')
         // return this.$store.getters.isAuthenticated
        // this.$router.go({path: this.$router.path})
      }
    }
  };
</script>

<style lang="sass">

</style>
