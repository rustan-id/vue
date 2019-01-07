<template>
  <header class="header"  >
    <div class="header__top">
      <router-link to="/">
        <app-logo></app-logo>
      </router-link>
      <nav>
        <ul>
          <li @click="showContacts"
              >
          Contacts
          </li>
          <router-link to="/signin"
                       tag="li"
                       v-if="!auth"
                       >
          Sign in
          </router-link>
          <router-link to="/signup"
                       tag="li"
                       v-if="!auth"
                       >
          Sign up
          </router-link>
          <router-link to="/donors"
                       tag="li"
                       v-if="auth"
                       >
          Participants
          </router-link>
          <li v-if="auth"
              @click="onLogout"
              >
          Log out
          </li>
        </ul>
      </nav>
    </div>
    <contacts :class="{contacts__show: isActive}"></contacts>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        isActive: false
      }
    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
      }
    },
    methods: {
      showContacts() {
        this.isActive = !this.isActive;
      },
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  };
</script>

<style lang="sass">
</style>
