<template>
	<!-- <div class="links" @click="$emit('show-contacts')"> -->
	<!-- <div class="links" @click="$emit('show-contacts')" :class="{active: isActive}" @show-contacts="showContacts"> -->
	<div class="links" @click="$emit('show-contacts')">
    
    <button type="button" class="links__link links__link--mail">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="36" height="36" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 120 120">
        <clipPath id="clip">
          <circle cx="60" cy="60" r="60"/>
        </clipPath>
        <rect id="black_stripe" width="120" height="120" y="0" x="0" fill=green clip-path="url(#clip)"/>
        <rect id="red_stripe" width="120" height="80" y="30" x="0" fill=darkgreen clip-path="url(#clip)"/>
        <rect id="gold_stripe" width="120" height="40" y="90" x="0" fill=green clip-path="url(#clip)"/>
        <path class="st1" fill="#fff" d="M88.3,37.5L59.6,65L30.8,37.5H88.3z M95,80.7c0,1-1.3,1.8-2.4,1.8h-66c-1.1,0-1.6-0.7-1.6-1.8V40.5L60,74
          l35-33.5V80.7z" clip-path="url(#clip)"/>
      </svg>
    </button>
    <button type="button" class="links__text">Контакты</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // isActive: false
      }
    },
    // methods: {
    //   passClick() {
    //     this.$emit('show-contacts');  
    //   }
      
    // }
  };
  // toggle() {
  //     this.open = !this.open;
  //   }
</script>

<style lang="sass" scoped>  
  @import "../../sass/_variables.sass"
  @import "../../sass/_mixins.sass"
  @import "../../sass/_base.sass"

  .links
  	position: relative
  	display: flex
  	justify-content: space-between
  // .active 
  // 	background-color: red
  .links__text
  	font-family: $font-load
  	position: relative
  	display: flex
  	margin: auto
  	align-items: center
  	justify-content: center
  	color: $color-dark
  	padding: 10px
  	font-size: $font-size-h5
  	font-weight: bold
  	background: none
  	outline: none
  	border: none
  	cursor: pointer
  	&:hover
  		color: $color-main
  .links__link--mail
  	display: block
  	// align-self: center
  	// align-items: center
  	margin-right: 10px
  	// position: absolute
  	background: none
  	border: none
  	outline: none
  	transition: 500ms linear
  	cursor: pointer
  	// top: 6px
  	// left: -40px
  	svg
  		border-radius: 50%
  		.st1
  			transform: translateX(0px)
  			transition: 500ms linear
  	&:hover
  	  opacity: 1
  	  svg .st1
  	  	transform: translateX(100px)
  	  	transition: 500ms linear
  .active 
  	background-color: red
	 
</style>
