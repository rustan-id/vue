<template>    
  <div class="logo">
		<a class="logo__link" href="#">City</a>
		<img class="header__logo" src="./../../img/LogoLC.png" alt="logo">
	</div>  
</template>

<script>
  // export default {
  //   name: 'Header',
  //   data () {
  //     return {
  //       msg: 'Welcome to Your Vue.js App'
  //     }
  //   }
  // }
</script>

<style lang="sass" scoped>  
  @import "../../sass/_variables.sass"
  @import "../../sass/_mixins.sass"
  @import "../../sass/_base.sass"

  .logo  	
  	display: flex
  	justify-content: space-between
  .header__logo
    display: block
    width: 36px
    height: 36px
    align-self: center
    margin-left: 10px
  .logo__link
  	display: block
  	font-size: $font-size-h5
  	margin: 0 auto
  	width: 98%
  	align-self: center
  	cursor: pointer
  	color: $color-dark
  	font-weight: bold

</style>

