import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import 'babel-polyfill'
import axios from 'axios'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import './plugins/vuetify'
import App from './App.vue'
import store from "./store/store.js"
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import './stylus/main.styl'
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://vue-city.firebaseio.com'
const regInterceptor = axios.interceptors.request.use(config => {
	console.log('Request Interceptor', config)
	return config
})
const resInterceptor = axios.interceptors.response.use(config => {
	console.log('Response Interceptor', res)
	return res
})
axios.interceptors.request.eject(regInterceptor)
axios.interceptors.response.eject(resInterceptor)

import Header from './components/header/Header.vue'
import PageMain from './views/mainPage/PageMain.vue'
import Logo from './components/header/Logo.vue'
import Links from './components/header/Links.vue'
import Contacts from './components/header/Contacts.vue'
import ProjectReview from './components/forMainPage/ProjectReview.vue'
import Comment from './components/forMainPage/Comment.vue'
import Features from './components/forMainPage/Features.vue'
import About from './components/forMainPage/About.vue'
import Pro from './components/projects/Pro.vue'
import Shetinina from './components/projects/Shetinina.vue'
import School from './components/projects/School.vue'
import Footer from './components/footer/Footer.vue'
import DonorsShetinina from './views/donorsPage/DonorsShetinina.vue'
import signup from './views/auth/signup.vue'
import signin from './views/auth/signin.vue'
import AlertCmp from './components/shared/Alert.vue'

// import colors from 'vuetify/es5/util/colors'
// import theme from './theme.js'
// import colors from '../node_modules/vuetify/es5/util/colors'
// Vue.use(Vuetify, { theme })

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  },
  // iconfont: 'fa4'// 'md' || 'mdi' || 'fa' || 'fa4
})

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.component('app-header', Header);
Vue.component('PageMain', PageMain);
Vue.component('app-logo', Logo);
Vue.component('Links', Links);
Vue.component('Contacts', Contacts);
Vue.component('ProjectReview', ProjectReview);
Vue.component('donors-shetinina', DonorsShetinina);
Vue.component('signup', signup);
Vue.component('signin', signin);
Vue.component('Comment', Comment);
Vue.component('Features', Features );
Vue.component('About', About);
Vue.component('Pro', Pro);
Vue.component('Shetinina', Shetinina);
Vue.component('School', School);
Vue.component('app-footer', Footer);
Vue.component('app-alert', AlertCmp);

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
  		apiKey: "AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4",
	    authDomain: "vue-city.firebaseapp.com",
	    databaseURL: "https://vue-city.firebaseio.com",
	    projectId: "vue-city",
	    storageBucket: "vue-city.appspot.com",
  	})
  	firebase.auth().onAuthStateChanged((user) =>{
  		if (user) {
  			this.$store.dispatch('tryAutoLogin', user)
  		} else {
  			this.$store.getters.isAuthenticated
  		}
  	})
  }
}).$mount('#app')

// export default ({ router, store }) => {
//   return new Vue({
//     el: '#app',
//     render: h => h(App),
//     router: router,
//     store: store
//    //  created() {
//    //    firebase.initializeApp({
// 	  //     apiKey: 'AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4',
// 	  //     authDomain: 'vue-city.firebaseapp.com',
// 	  //     databaseURL: 'https://vue-city.firebaseio.com',
// 	  //     projectId: 'vue-city',
// 	  //     storageBucket: 'vue-city.appspot.com'
// 	  // 	})
// 	  // }
//   })
// }