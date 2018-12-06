<template>
	<div>
		<h1>Регистрация</h1>
		<v-container>
			<v-layout row>
				<v-flex xs12 sm6 offset-sm3>					
					<v-form @submit.prevent = "onSubmit"
					  ref="form"
			      id="signup"
			      v-model="valid" 
			      lazy-validation
			      method="post"
			      action="/submit"
			      class="signup">
			      <v-text-field 
							type="number"
							:rules="donRules"				       
							label="Сумма взноса"
							id="donation"		           
							class="smeta__donate" 
							v-model='donation'
							required> 
						</v-text-field>
						<v-select
			        v-model="selected"
		          :items="options"
		          label="Выберите проект"
		          required>	  	        	
			      </v-select>
			      <p v-if="selected === 'Shetinina-17'">В проект Shetinina-17 осталось собрать {{ restCost }} рублей </p>
				    <v-text-field
	            type="text"
				      label="Псевдоним"
				      :rules="pseudoRules"
				      placeholder="Valeriy Petrovich" 
				      id="pseudo"		           
		          class="smeta__pseudo" 
		          v-model='pseudo'	           
		          title="Псевдоним будет указан в публичном списке участников, для Вашего контроля сбора средств"        
			        required>		         	
				    </v-text-field>
				    <v-text-field 
							type="number"
							label="Номер Телефона"
							:rules="telRules"
							id="tel"		           
							class="smeta__tel" 
							v-model='tel'      	                     
							> 
				    </v-text-field>
				    <v-text-field 
							type="email"
							:rules="emailRules"
							label="Адрес электропочты"
							id="email"
							class="smeta__email"	     
							v-model='email'	
							required	                             
							>
				    </v-text-field>
				    <v-text-field 
							:type="passwordType"
							:rules="passwordRules"
							label="Пароль"
							id="password"
							class="smeta__password"			     
							v-model='password'	
							:append-icon="hidePassword ? 'visibility_off' : 'visibility'"
							@click:append="hidePassword = !hidePassword"                           
							required>							
						</v-text-field>						
						<v-checkbox	color="green"				      
				      id="terms"
				      v-model="terms"
				      :rules="switchRules"
				      class="smeta__terms"				  
				      required>		
					    <div slot="label">
				        Принимаю условия
				        <v-tooltip bottom>
				          <a slot="activator" target="_blank" href="http://vuetifyjs.com" @click.stop>Пользовательского соглашения</a>
				          Откроется в новом окне
				        </v-tooltip>			        
				      </div>    	
				    </v-checkbox>
				    <div v-if="modalSignup">Спасибо за участие! Ваш запрос отправлен менеджеру.</div>	    
				    <button	        	                                 
				           :disabled="!valid"
				           type="submit" 			           
				           class="signup__btn"
				           >                
						  забронировать взнос						  
					  </button>	
					  <v-alert
					    dismissible
					    error
					    @input='onDismissed'
					    :value="true"
					    class="alert__error"
					    v-if="error"
					    >
					    Проверьте правильность заполнения формы, вероятно, Вы указали зарегистрированную ранее электропочту
					  </v-alert>
					  <v-alert
					    dismissible
					    error
					    @input='onDismissed'
					    :value="true"
					    class="alert__error"
					    v-if="!valid"
					    >
					    Проверьте правильность заполнения формы, вероятно, Вы не приняли условия пользовательского соглашения
					  </v-alert>
			    </v-form>	
				</v-flex>
			</v-layout>
		</v-container>
	</div>		
</template>

<script>
  import firebase from "firebase"
  import axios from "axios"
  import store from "../../store/store"
  import Vuex from "vuex"
  // import { required, email, numeric, minValue, minLength, maxLength, requiredUnless } from 'vuelidate/lib/validators'
  
  export default {
  	data() {	  	
	  	return {
	  		password: '',
        hidePassword: true,
	  		valid: false,
	  		donation: null,
	  		pseudoRules: [
	        v => !!v || 'Обязательное поле'	       
	      ],
	  		donRules: [
	        v => !!v || 'Обязательное поле',
	        v => (v && v.length >= 3) || 'Минимальный взнос - 100 рублей '
	      ],
	      passwordRules: [
	        v => !!v || 'Обязательное поле',
	        v => (v && v.length >= 6) || 'Минимальное количество символов - 6'
	      ],
	  		emailRules: [
	        v => !!v || 'Обязательное поле',
	        v => /.+@.+/.test(v) || 'Некорректный адрес электропочты',
	        v => (v && v.length >= 8) || 'Минимальное количество символов - 8'
	      ],
	      switchRules: [
	        v => !!v || ''
	      ],
	  		// invalid: false,
	  		selected: '',
	  		options: ['Shetinina-17', 'School-53'],
	  		telRules: [
	        v => !!v || 'Обязательное поле',
	        v => (v && v.length >= 10) || 'Минимальное количество цифр номера - 10',
	        v => (v && v.length <= 12) || 'Максимальное количество цифр номера - 12'
	      ],
	  		terms: false,
	  		errors: [],
		  	donation: '',
		  	projects: '',
	  		pseudo: '',
	  		tel: null,
	  		email: '',
	  		// password: '',	  		
	  		// confirmPassword: '',
	  		modalSignup: false,
	  		unique: true,
	  		submitStatus: null
	  		// maxlength: true
	  		// restCost: 20000
	  	}
	  },	  
    computed: {
    	restCost() {
        return this.$store.state.restCost;
      },
      user () {
      	return this.$store.getters.user
      },
      error () {
      	return this.$store.getters.error
      },
      loading () {
      	return this.$store.getters.loading
      },
      passwordType() {
        return this.hidePassword ? 'password' : 'text'
      } 
	  },
	  watch: {
	  	user (value) {
	  		if (value !== null && value !== undefined) {
	  			this.$router.push('/')
	  		}
	  	}
	  },
	  
    methods: {
    	rest() {
        this.pro ===  this.projects
    	},
    	onDismissed() {
    		console.log('dismissed')
    		this.$store.dispatch('clearError')
    	},
      onSubmit() {
      	const donation = this.donation;
        const pseudo = this.pseudo;
        const tel = this.tel;
        const email = this.email;
        const password = this.password;
	      const formData = {  
      	  donation,
          pseudo,
          tel,
          email,
          password
          // confirmPassword
        }
        const donationData = {
        	donation,
        	pseudo
        }
        console.log(formData)
        if (!this.terms) {
        	this.valid = false;
        } else if (this.$refs.form.validate()) {
	        	this.$store.dispatch('signup', formData)
	          this.$store.dispatch('createDonation', donationData)
	        }        
      }    
    }
  };
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



<!-- // validations: {
	  // 	email: {
	  // 		required,
	  // 		email,
	  // 		unique: val => {
	  // 			if (val === "") return true
	  // 			return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
	  // 		  .then(res => {
	  // 		    return Object.keys(res.data).length === 0
	  // 		  })
	  // 		}
	  // 	},
	  // 	// donation: {
	  // 	// 	required,
	  // 	// 	numeric,
	  // 	// 	minVal: minValue(100)
	  // 	// },
	  // 	pseudo: {
	  // 		required,
	  // 		minLen: minLength(3),
	  // 		maxLen: maxLength(20)
	  // 	},
	  // 	password: {
	  // 		required,
	  // 		minLen: minLength(6)
	  // 	},
	  // 	projects: {
	  // 		required
	  // 	},
	  // 	terms: {
	  // 		required
	  // 	}, 
	  // 	tel: {
	  // 		required,
	  // 		minLen: minLength(10),
	  // 		maxLen: maxLength(12)
	  // 	}
	  // }, 
	  // created () { 
   //  	this.$store.dispatch('storeUser')
   //  },   -->

<!-- <v-form @submit.prevent = "onSubmit"
		      id="signup"
		      v-model="valid" 
		      lazy-validation
		      method="post"
		      action="/submit"
		      class="signup"> -->
		  <!-- <div class="input" :class="{invalid: $v.donation.$error}"> -->
		  	<!-- <label for="donation">Сумма взноса</label>   -->
				<!-- <v-text-field 
		       type="number"
		       :rules="nameRules"				       
		       label="Сумма взноса"
		       id="donation"		           
           class="smeta__donate" 
           v-model='donation'> 
				</v-text-field> -->
				<!-- <p class="signup__error" v-if="!$v.donation.minVal">Минимальный взнос - {{ $v.donation.$params.minVal.min }} рублей</p> 
				<p class="signup__error" v-if="!$v.donation.$invalid">Вау</p> --> 
		  <!-- </div> -->
		  

		  <!-- <div class="input">	 -->
		    <!-- <v-select
	        v-model="selected"
          :items="options"
          label="Выберите проект">	  	        	
	      </v-select> -->
				<!-- <p v-if="selected === 'Shetinina-17'">В проект Shetinina-17 осталось собрать {{ restCost }} рублей </p>			 -->
			<!-- </div> -->
			
		  <!-- <div class="input">	 -->
		    <!-- <v-text-field
            type="text"
			      label="Псевдоним"
			      placeholder="Valeriy Petrovich" 
			      id="pseudo"		           
	          class="smeta__pseudo" 
	          v-model='pseudo'	           
	          title="Псевдоним будет указан в публичном списке участников, для Вашего контроля сбора средств" 
	          minLength="3"
		        >		         	
		    </v-text-field>	 -->  
		    <!-- <p class="signup__error" v-if="!$v.pseudo.minLen">Минимальное количество символов - {{$v.pseudo.$params.minLen.min}} </p> 
				<p class="signup__error" v-if="!$v.pseudo.maxLen">Максимальное количество символов - {{$v.pseudo.$params.maxLen.max}} </p>  -->
			<!-- </div> -->
			<!-- <div class="input" :class="{invalid: $v.tel.$error}">	 -->
				<!-- <v-text-field 
				       type="number"
				       label="Номер Телефона"
				       id="tel"		           
		           class="smeta__tel" 
		           v-model.number='tel'              	                      
				       > 
				</v-text-field> -->
		    <!-- <p class="signup__error" v-if="!$v.tel.minLen">Минимальное количество цифр - {{$v.tel.$params.minLen.min}} </p> 
				<p class="signup__error" v-if="!$v.tel.maxLen">Максимальное количество цифр - {{$v.tel.$params.maxLen.max}} </p>  -->
		  <!-- </div> -->
      <!-- <div class="input" :class="{invalid: $v.email.$error}"> -->
      	<!-- <v-text-field 
				       type="email"
				       label="Адрес электропочты"
				       id="email"
		           class="smeta__email"	     
		           v-model='email'		                             
				       > 
				</v-text-field> -->
		   <!--  <p class="signup__error" v-if="!$v.email.email">Некорректный адрес электропочты</p>  -->
		    <!-- <p class="signup__error" v-if="!$v.email.required">Обязательное поле для заполнения</p> --> 
		    
		    <!-- <p class="signup__error" v-if="!$v.email.$unique">Этот адрес уже используется</p>  -->
		  <!-- </div>       -->
   
      <!-- <div class="input" :class="{invalid: $v.password.$error}"> -->
      	<!-- <v-text-field 
				       type="password"
				       label="Пароль"
				       id="password"
		           class="smeta__password"		          
		     
		           v-model='password'		                            
				       > 
				</v-text-field>	 -->	    
		    <!-- <p class="signup__error" v-if="!$v.password.minLen">Минимальное количество символов - 6 </p> 	 -->
		  <!-- </div>  -->

		  <!-- <div class="input" :class="{invalid: $v.terms.$error}"> -->
		  	<!-- <v-switch	color="green"				      
				      id="terms"
				      v-model="terms"
				      class="smeta__terms"				  
				    >		
				    <div slot="label">
			        Принимаю условия
			        <v-tooltip bottom>
			          <a slot="activator" target="_blank" href="http://vuetifyjs.com" @click.stop>Пользовательского соглашения</a>
			          Откроется в новом окне
			        </v-tooltip>			        
			      </div>    	
		    </v-switch>		  -->   
		  <!-- </div>  -->
	    <!-- <div v-if="modalSignup">Спасибо за участие! Ваш запрос отправлен менеджеру.</div>	    
	    <v-btn 	           	                                 
	           :disabled="!valid"
	           type="submit"
	           >                
			  забронировать взнос
		  </v-btn> -->
		  <!-- <p class="typo__p" v-if="$v.$invalid">Please fill the form correctly.</p> -->		  
		<!-- </v-form>	 -->


        <!-- // this.$store.dispatch('signUserUp', donationData)

      //   this.$v.$touch()
	     //  if (this.$v.$invalid) {
	     //    this.submitStatus = 'error'
	     //  } else {
	     //    // do your submit logic here
	     //    this.submitStatus = 'pending'
	     //    setTimeout(() => {
	     //      this.submitStatus = 'ok'
	     //    }, 500)
	     //  }		    
      
  //       
        
  //     	if (donation && pseudo && email && password) {
  //         return true,
  //         this.modalSignup = true
  //       } 
       
  //       this.errors = [];
  //     	let errors = this.errors; 

	 //      if (!donation) {
	 //        errors.push('Сумма взноса.');
	 //      }
	 //      if (!pseudo) {
	 //        errors.push('Псевдоним участника.');
	 //      }	
	      
	 //      if (!email ) {
	 //        errors.push('Адрес электропочты.');
	 //      }
	 //      if (email.message === "EMAIL_EXISTS" ) {
	 //        errors.push('Почта существует');
	 //      }	
	 //      if (!password) {
	 //        errors.push('Пароль.');
	 //      } 
	 //    }            
	 //  }
  // }; -->