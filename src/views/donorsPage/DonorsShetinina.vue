<template>
	<div class="donors__shetinina" v-if="auth">
		<h1>Участники/доноры проекта</h1>		
	  <!-- <button type="button" 
            class="button button--details"              	
            @click="fetch"
            >
            fetchUsers
	  </button>	 -->
	  <button type="button" 
            class="button button--details"              	
            @click="get"            
            >
            Открыть список участников
	  </button>	
	  <!-- v-on:click="gettusers"  -->
		<div v-for="user in users" :user="user" class="donors">
			<div class="donors__donation">{{ user.donation }} руб</div>
			<div class="donors__donation">{{ user.pseudo }}</div>
		</div>
			<!-- <div class="donors__donation">{{ kuser }} User</div> -->
			<!-- <div class="donors__pseudo">{{ pseudo }}</div> -->
		<!-- </div> -->
	</div>	
</template>

<script>
  import firebase from 'firebase'
  import axios from '../../axios-auth'
  import globalAxios from 'axios'
  import { mapGetters } from "vuex";
  import store from "../../store/store";
  export default {	
  	data() {
  		return {
  			tuser: 'f',
  			users: [],
        loadDonation: []
      }
    },
    computed: {  		
    	getusers() {  
        return this.$store.getters.gusers        
      },
      getDonations() {
        return this.$store.getters.donations
      },
      auth() {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
	  	// fetch() {
	  	// 	this.$store.dispatch('fetchUser')  		
	   //  },
	    get() {
        this.users = this.getusers         
	    	// this.users = this.getDonations         
      }
	    // refresh() {
	    // 	return getusers
	    // }    
	  },
	

	  created () { 
    	this.$store.dispatch('fetchUser')
    },
  };
    // getPost(this.$route.params.id, (err, post) => {
    //     this.loading = false        
   //  beforeRouteEnter (to, from, next) {
	  //   users( (err, users) => {
	  //     next(vm => vm.setData(err, users))
	  //   })
	  // },
	  // если путь изменяется, а компонент уже отображён,
	  // то логика будет немного иной
	  // beforeRouteUpdate (to, from, next) {
	  //   this.users = null
	  //   getUsers(this.$store.getters.users, (err, users) => {
	  //     this.setData(err, users)
	  //     next()
	  //   })
	  // },
	  
	    // setUsers (err, users) {
	    //   if (err) {
	    //     this.error = err.toString()
	    //   } else {
	    //     this.users = users
	    //   }
	    // }
	    
	  
 
  		// axios.get('/users.json')
    // 	  .then(res => {
    // 	  	console.log(res)
    // 	  	const data = res.data
    // 	  	const users =[]
    // 	  	for (let key in data) {
    // 	  		const user = data[key]
    // 	  		user.id = key
    // 	  		users.push(user)
    // 	  	}
    // 	  	console.log(users)
    // 	  	this.donation = users[2].donation
    // 	  })
    // 	  .catch(error => console.log(error))    	     
      
    
    // methods: {
    // 	...mapActions({
    // 		fetchData: 'loaddata'
    // 	}),    	
    //   loadData() {
    //     this.fetchData();                
    //   },
    //   // console.log(data);
    // }  
  
</script>

<style lang="sass" scoped>  
  @import "../../sass/_mixins.sass"
  @import "../../sass/_variables.sass"
  @import "../../sass/_base.sass"
  @import "../../sass/_buttons.sass"
  // @import "../../sass/_project.sass"
  @import "../../sass/_donors.sass"

  button .button--details
  	display: block
  h1
  	margin-top: 100px
</style>