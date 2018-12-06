<template>
	<div class="contacts">
    <div class="contacts__container">     
      <div class="contacts__data whatsapp">
        <span class="contacts__name">WhatsApp:</span>
        <span class="contacts__details">xx</span>
      </div>
      <div class="contacts__data viber">
        <span class="contacts__name">Viber:</span>
        <span class="contacts__details">xx</span>
      </div>
      <div class="contacts__data telegram">
        <span class="contacts__name">Tel:</span>
        <span class="contacts__details">+79892783773</span>
      </div>
      <div class="contacts__data contacts__data--mail">
        <span class="contacts__name">Email:</span>
        <a class="contacts__details" href="mailto:#">city@gmail.com</a>
      </div>      
      <div class="contacts__data contacts__data--fb-msg">
        <a class="contacts__name" href="#">Facebook Messenger</a>
      </div>
      <div class="contacts__oferta">
        <a  href="#">Пользовательское соглашение</a>
      </div>
    </div>
  </div>
</template>	

<script>
  export default {
    data () {
      return {
        // isActive: false
      }      
    },
    // computed: {
    //   showContacts() {
    //     this.active = !this.active;
    //   }
    // }
    // methods: {
    //   showContacts() {
    //      this.isActive = !this.isActive;  
    //   }
    // }
  };
</script>

<style lang="sass" scoped>  
  @import "../../sass/_variables.sass"
  @import "../../sass/_mixins.sass"
  @import "../../sass/_base.sass"
  @import "../../sass/_contacts.sass"
  
</style>