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
        <links @show-contacts="showContacts"></links>
        <nav >
          <ul>
            <li v-if="!cusers">
              <router-link to="/signin">Войти</router-link>
            </li>
            <li v-if="!cusers">
              <router-link to="/signup">Регистрация</router-link>
            </li>
            <li v-if="cusers">
              <button @click="onLogout">Выйти</button> 
            </li>
          </ul>
        </nav>
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
    // beforeRouteEnter (to, from, next) {
    //   getAuth(to.params.id, (err, value) => {
    //     next(vm => vm.setAuth(err, value))
    //   })
    // },
    // beforeRouteUpdate (to, from, next) {
    //   this.auth = false
    //   getAuth(to.params.id, (value) => {
    //     this.setAuth(value)
    //     next('/')
    //   })
    // },
    // watch: {
    //   cusers (value) {
    //     if (this.cusers) {
    //       this.$router.push('/');
    //       return this.cusers === true;
    //       // this.cusers === false
    //     }
    //   }
    // },
    methods: {
      // setAuth (value) {
      //   if (value !== null && value !== undefined) {
      //     this.auth = true
      //   } else {
      //     this.auth = false
      //   }
      // },
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

    
    
    // watch: {
    //   '$route' (to, from) {
    //     return this.auth === true;
    //     // обрабатываем изменение параметров маршрута...
    //   }
    // },
    // watch: {
    //   // при изменениях маршрута запрашиваем данные снова
    //   '$route': 'cusers'
    // },
      
    // watch: {
    //   auth () {
    //     if (this.$store.getters.isAuthenticated == true) {
    //       this.auth = true
    //     }
    //   }      
    // },
    
      

      // auth() {
      //   this.$store.getters.isAuthenticated
      // },

      // async onLogoutM() {
      //   await this.$store.dispatch('logout')
      //   this.auth = await this.$store.getters.isAuthenticated
      //   return auth
      //   console.log(auth)
      // },
      // async onLogoutP() {
      //   const logout = await this.$store.dispatch('logout');       
      //   const a = await this.$store.getters.isAuthenticated;
      //   this.auth = a;
      //   console.log(auth);//false
      //   return auth;        
      // },
    // },
    
    // watch: {
    //   '$store.state.idToken': 'auth'
    // },
    // created () {       
      
    //   // const isAuth = this.auth
    //   // console.log(isAuth)     
    // }    
    // 
      // vm.$watch(
      //   function () {
      //     return this.a + this.b
      //   },
      //   function (newVal, oldVal) {
      //     // значение функции изменилось, сделайте что-нибудь
      //   }
      // )
      // watch() {
      //   vm.$watch('auth', function () {
      //     this.isAuth = this.auth
      //   })    
      // }
    
    // created () {
    //   vm.$watch('auth', function () {
    //     this.isAuth = this.auth
    //   }) 
    // },
    // beforeMount() {
    //   this.auth = this.$store.getters.isAuthenticated
    // }
  
</script>

<style lang="sass">  
  @import "./../../sass/_mixins.sass"
  @import "../../sass/_variables.sass"
  @import "../../sass/_base.sass"
  @import "../../sass/_header.sass"
  
  nav 
    width: 30%

</style>