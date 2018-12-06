<template>
  <v-alert
    dismissible
    error
    @input='onClose'
    :value="true"
    class="alert__error"
  >
    Проверьте правильность заполнения формы, вероятно, Вы указали зарегистрированную ранее электропочту
  </v-alert>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose() {
        this.$emit('dismissed')
      }
    }
  };
</script>

<style lang="sass" scoped>
  .alert__error
    margin-top: 10px
    width: 100%
  
</style>