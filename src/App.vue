<template>
  <v-app>
    <!-- <v-toolbar>
      <app-header></app-header>
    </v-toolbar> -->

    <!-- <v-content>   -->
    <app-header></app-header>   
    <router-view></router-view> 

    <app-footer></app-footer>
    <div class="overlay"></div>   
    <!-- </v-content> -->
  </v-app>
</template>

<script>

import WebFontLoader from 'webfontloader'
import colors from 'vuetify/es5/util/colors'

// import Header from './components/header/Header.vue'
// import Footer from './components/footer/Footer.vue'
// import PageMain from './views/mainPage/PageMain.vue'
 
  export default {
    // components: {
    //   Header,
    //   Footer,
    //   PageMain
    // },
    mounted () {
      WebFontLoader.load({
        google: {
          families: ['Roboto:100,300,400,500,700,900']
        },
        active: this.setFontLoaded
      })
    },
    methods: {
      setFontLoaded () {
        this.$emit('font-loaded')
      }
    },
    created() { 
      this.$store.dispatch('tryAutoLogin')
      this.$vuetify.theme.primary = '#4CAF50'
    },
    computed: {
      // header () {
      //   let authR = false;
      //   if (this.auth) {
      //     authR = true
      //   }
      //   return authR
      // },
      auth() {
        // return this.$store.getters.isAuthenticated;
        return this.$store.getters.gusers !== null && this.$store.getters.gusers !== undefined
      }      
    }
    // watch: {
    //  auth(newVal) {
    //     if (newVal) {
    //       const isAuth = this.auth         
    //     }
    //   }
    // } 
  };
</script>

<style lang="sass">

  @import "./sass/_mixins.sass"
  @import "./sass/_variables.sass"
  @import "./sass/_base.sass"
</style>
