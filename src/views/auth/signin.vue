<template>
	<div class="signin">
		<h1>Войти</h1>
		<form @submit.prevent = "onSubmit"
		      method="post"
		     
		      action=""
		      class="signin__form">		  
	    <label for="email">Адрес электропочты</label>
	    <input type="email"
	           placeholder="ivanov@gmail.com"
	           id="email"
	           class="smeta__mail"
	           v-model='email'
	           minlength="10" 
	           >
	    <label for="password">Пароль</label>	
	    <input type="password"
	           placeholder="password" 
	           id="password"
	           class="smeta__password"
	           v-model='password'
	           minlength="1" 
	           >	
	    <p class="error" v-if="errors.length">
        <b>Заполните, пожалуйста, недостающие поля:</b>
	      <ul>
	        <li v-for="error in errors">{{ error }}</li>
	      </ul>
	    </p>
	    <!-- :disabled="isDisable()" -->
	    <!-- <router-link to="/donors-shetinina"> -->
	    <button type="submit"                          
	            class="button button--details"           
	            >
	            <router-link to="/donors-shetinina">
							Войти(список)					
					    </router-link>		  
		  </button>	
		  <!-- <button type="submit"                          
	            class="button button--details"
	            v-if="auth" 
	            >     	                   
			  Авторизован
		  </button>	 -->
		  <!-- </router-link> -->
		  <!-- <donors-shetinina></donors-shetinina>	   -->
		</form>		
		
	</div>	
</template>

<script>
  // import firebase from 'firebase'
  // import store from "../../store/store"
  // import Vuex from "vuex"
  // import axios from '../../axios-auth'

  // import {mapActions} from "vuex";
  export default {

     
   //  computed: {
   //  	list() {
   //      return this.$store.getters.list;
   //    }
	  // },
	  data() {	  	
	  	return {
	  		errors: [],
	  		email: '',
	  		password: '',
	  		authR: false
	  		// isShow: true,
	  		// isShown: false
	  	}
	  },
	  computed: {
  		// auth() {
    //     return this.$store.getters.isAuthenticated
    //   },
      cusers () {
      	return this.$store.getters.gusers
      }
    },
	  watch: {
	  	cusers (value) {
	  		if (value !== null && value !== undefined) {
	  			this.$router.push('/')
	  			this.authR === true

	  		}
	  	}



	  }, 
		   
    methods: {
    	// newBut () {
    	// 	this.authR = true;
    	// 	return authR;
    	// 	console.log(authR)
    	// },
    	// ...mapActions({
    	// 	fetchData: 'loaddata'
    	// }),     	
      // loadData() {
      //   this.fetchData();
      // },
      onSubmit() {
      	// this.isShown = true;
      	// this.isShow = false;
      	const formData = {  
      	  // donation: this.donation,
         //  pseudo: this.pseudo,
         //  tel: this.tel,
          email: this.email,
          password: this.password
          // confirmPassword: this.confirmPassword,
        }
        console.log(formData)
        this.$store.dispatch('login', {email: formData.email, password: formData.password})
        // .then(auth => {
        // 		alert("logged");
        // 		this.$router.go({path: this.$router.path})
        // 	}
        // );
        
        // const isAuth = this.auth;
      }	          
	  },
	   
  };


        // axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        // 	email: formData.email,
        // 	password: formData.password,
        // 	returnSecureToken: true
        // })
      	 //  .then(res => console.log(res))
      	 //  .catch(error => console.log(error))



      	// this.errors = [];
      	// let errors = this.errors;

        // let donation = this.list.donation;
        // let pseudo = this.list.pseudo;
        // let tel = this.list.tel;
        // let mail = this.list.mail;
        // let password = this.list.password;

        // const data = {
	      	// 	list: this.$store.getters.list
	      	// };
        

      	// if (donation && pseudo && tel && mail && password) {
       //    return true,
       //    this.list.push({
	      //   	donation,
	      //   	pseudo,
	      //   	tel,
	      //   	mail,
	      //   	password
       //    }),      
	      	
	      // 	this.$http.put('data.json', data);    	
       //  };

	      // if (!mail) {
	      //   errors.push('Адрес электропочты.');
	      // }	
	      // if (!password) {
	      //   errors.push('Пароль.');
	      // }	

</script>

<style lang="sass" scoped>  
  @import "../../sass/_mixins.sass"
  @import "../../sass/_variables.sass"
  @import "../../sass/_base.sass"
  @import "../../sass/_buttons.sass"
  // @import "../../sass/_project.sass"
  @import "../../sass/_signup.sass"

  button .button--details
  	display: block
  h1
  	margin-top: 100px

</style>