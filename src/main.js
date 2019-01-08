import Vue from 'vue'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import axios from 'axios'
import * as firebase from 'firebase'
import './plugins/vuetify'
import App from './App.vue'
import store from "./store/store.js"
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://vue-city.firebaseio.com'

import Header from './components/header/Header.vue'
import PageMain from './views/mainPage/PageMain.vue'
import Logo from './components/header/Logo.vue'
import Contacts from './components/header/Contacts.vue'
import Features from './components/forMainPage/Features.vue'
import About from './components/forMainPage/About.vue'
import Pro from './components/projects/Pro.vue'
import BakerStreet from './components/projects/BakerStreet.vue'
import School from './components/projects/School.vue'
import Footer from './components/footer/Footer.vue'
import Donors from './views/donorsPage/Donors.vue'
import signup from './views/auth/signup.vue'
import signin from './views/auth/signin.vue'

Vue.use(Vuetify)

Vue.component('app-header', Header);
Vue.component('PageMain', PageMain);
Vue.component('app-logo', Logo);
Vue.component('Contacts', Contacts);
Vue.component('donors', Donors);
Vue.component('signup', signup);
Vue.component('signin', signin);
Vue.component('Features', Features );
Vue.component('About', About);
Vue.component('Pro', Pro);
Vue.component('app-baker', BakerStreet);
Vue.component('School', School);
Vue.component('app-footer', Footer);

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x",
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
    firebase.auth().useDeviceLanguage();
  }
}).$mount('#app')
