<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import WebFontLoader from 'webfontloader'
  export default {
    // methods: {
    //   setFontLoaded () {
    //     this.$emit('font-loaded')
    //   }
    // },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
      }
    },
    created() {
      this.$store.dispatch('tryAutoLogin')
      this.$vuetify.theme.green = "#4CAF50"
      this.$vuetify.theme.primary = "#4CAF50"
      this.$vuetify.theme.greendarken4 = "#1B5E20"
    },
    mounted () {
      WebFontLoader.load({
        google: {
          families: ['Roboto:100,300,400,500,700,900']
        },
        active: this.setFontLoaded
      })
    }
  };
</script>

<style lang="sass">
  @import "./sass/_mixins.sass"
  @import "./sass/_variables.sass"
  @import "./sass/_base.sass"
  @import "./sass/_auth.sass"
  @import "./sass/_about.sass"
  @import "./sass/_contacts.sass"
  @import "./sass/_donors.sass"
  @import "./sass/_features.sass"
  @import "./sass/_footer.sass"
  @import "./sass/_header.sass"
  @import "./sass/_project.sass"
  @import "./sass/_logo.sass"
</style>
