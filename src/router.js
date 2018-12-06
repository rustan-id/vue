import Header from './components/header/Header.vue'
import DonorsShetinina from './views/donorsPage/DonorsShetinina.vue'
import signup from './views/auth/signup.vue'
import signin from './views/auth/signin.vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store"
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: PageMain},
  { path: '/signup', component: signup},
  { path: '/donors-shetinina',
      component: DonorsShetinina,
  },
  { path: '/signin', component: signin}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

export default router
