import Vue from 'vue'
import Donors from './views/donorsPage/Donors.vue'
import signup from './views/auth/signup.vue'
import signin from './views/auth/signin.vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store.js"
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: PageMain},
  { path: '/signup', component: signup},
  { path: '/donors',
      component: Donors,
      beforeEnter: (to, from, next) => {
        if(store.getters.isAuthenticated) {
          next()
        } else {
          next('/signin')
        }
      }
  },
  { path: '/signin', component: signin}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

export default router

