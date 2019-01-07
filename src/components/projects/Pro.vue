<template>
  <section id="pro" class="project">
    <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Select the project"
      required>
    </v-select>
    <transition name="slide-fade">
      <app-baker v-if='selected==="Baker Street"'></app-baker>
      <school  v-else-if='selected==="School №53"'></school>
    </transition>
    <div class="project__button">
      <router-link to="/signup">
        <button class="city__btn">Donate</button>
      </router-link>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        selected: 'Baker Street',
        adresses: ['Baker Street','School №53']
      }
    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    }
  };
</script>

<style lang="sass">
</style>
