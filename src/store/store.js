import Vue from "vue"
import Vuex from "vuex"
// import VueRouter from 'vue-router'
import axios from './../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../router.js'
import smeta from './modules/smeta.js'

// import smeta from "./modules/smeta"
// import donors from "./modules/donors"
// import * as actions from "./actions";

Vue.use(Vuex)
// Vue.use(VueRouter)
// Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    // restCost: 20000,
    // loadDonation: [],
    idToken: null,
    userId: null,
    user: null,
    usersBaker: [],
    usersSchool: [],
    loading: false,
    error: null,
    resetError: false,
    success: false,
    sumBaker: null
    // restDonationsLenina: 3,
    // restDonationsSchool: 2
  },
  mutations: {
    // storeRestDonations(state, payload) {
    //   state.restDonationsLenina = payload.restLenina,
    //   state.restDonationsSchool = payload.restSchool
    // },
    saveSum (state, payload) {
      state.sumBaker = payload
    },
    authUser (state, userData) {
      state.idToken = userData.token,
      state.userId = userData.userId
    },
    storeUsersBaker (state, payload) {
      state.usersBaker = payload
    },
    storeUsersSchool (state, payload) {
      state.usersSchool = payload
    },
    setUser (state,payload) {
      state.user = payload
    },
    clearAuthData (state) {
      state.IdToken = null,
      state.userId = null
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    clearIdToken(state) {
      state.idToken = null
    },
    resetError(state, payload) {
      state.resetError = payload
    },
    sentSuccess(state) {
      // state.resetError = null
      state.success = true
    }
  },
  actions: {
    // tryAutoLogin ({commit}) {
    //   const token = localStorage.getItem('token')
    //   if(!token) {
    //     return
    //   }
    //   const expirationDate = localStorage.getItem('expirationDate')
    //   const now = new Date()
    //   if(now >= expirationDate) {
    //     return
    //   }
    //   const userId = localStorage.getItem('userId')
    //   commit ('authUser', {
    //     token: token,
    //     userId: userId
    //   })

    // },
    // setRest({commit}, payload) {
    //   commit('storeRestDonations', payload)
    // },
    saveSum({commit}, payload) {
      const sumLenina = payload
      console.log(sumLenina)
      commit('saveSum', sumLenina )
    },
    setLogoutTimer({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    fetchDonations ({commit}) {
      globalAxios.get('/users-baker.json')
        .then(res => {
          console.log(res)
          const data = res.data
          const usersBaker =[]
          for (let key in data) {
            const user = data[key]
            user.id = key
            usersBaker.push(user)
          }
          commit('storeUsersBaker', usersBaker)
        })
        .catch(error => console.log(error))
      globalAxios.get('/users-school.json')
        .then(res => {
          console.log(res)
          const data = res.data
          const usersSchool =[]
          for (let key in data) {
            const user = data[key]
            user.id = key
            usersSchool.push(user)
          }
          commit('storeUsersSchool', usersSchool)
        })
        .catch(error => console.log(error))
    },
    fetchUsers ({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users-baker.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const usersBaker =[]
          for (let key in data) {
            const user = data[key]
            user.id = key
            usersBaker.push(user)
          }
          commit('storeUsersBaker', usersBaker)
        })
        .catch(error => console.log(error))
      globalAxios.get('/users-school.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const usersSchool =[]
          for (let key in data) {
            const user = data[key]
            user.id = key
            usersSchool.push(user)
          }
          commit('storeUsersSchool', usersSchool)
        })
        .catch(error => console.log(error))
    },
    signup ({commit, dispatch}, authData) {
      commit('setLoading', true)
      commit('clearError')
      axios.post('/signupNewUser?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          commit('setLoading', false)
          const now = new Date ()
          const expirationDate = new Date (now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', authData)
          router.replace('/donors')
          // router.go({path: router.path})
          // dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          }
        )
    },

    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if(!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if(now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit ('authUser', {
        token: token,
        userId: userId
      })

    },
    login ({commit}, authData) {
      commit('setLoading', true)
      commit('clearError')
      axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          const now = new Date ()
          const expirationDate = new Date (now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          commit('setLoading', false)
          // router.go({path: router.path})
          router.replace('/donors')
          // dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          }
        )
    },
    logout({commit}) {
      commit('clearAuthData')
      commit('clearIdToken')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      // router.replace('/signin')
      router.replace('/')
      // router.go({path: router.path})
    },
    storeUser ({state}, userData) {
      if (!state.idToken) {
        return
      } else if (userData.selected === "Lenina, 35" ) {
      // globalAxios.post('/users.json')
        globalAxios.post('/users-baker.json' + '?auth=' + state.idToken, userData)
          .then(res => {
            // commit('storeUsersLenina', userData)
            console.log(res)
          })
          .catch(error => console.log(error))
      } else if (userData.selected === 'School №53') {
      // globalAxios.post('/users.json')
        globalAxios.post('/users-school.json' + '?auth=' + state.idToken, userData)
          .then(res => {
            // commit('storeUsersSchool', userData)
            console.log(res)
          })
          .catch(error => console.log(error))
      }
    },
    // signUserIn({commit}, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    //     .then(user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           donationData: []
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //     })
    // },
    // signUserUp({commit}, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //     .then(
    //       user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           donationData: []
    //         }
    //         commit('seteUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    clearError({commit}) {
      commit('clearError')
    },

    resetPassword({commit}, payload) {
      firebase.auth().sendPasswordResetEmail(payload).then(function() {
        console.log("reset link is sent")
        commit('sentSuccess')
      }).catch(function(error) {
        commit('resetError', error)
      })
    }
  },
  getters: {
    // restDonationsLenina(state) {
    //   return state.restDonationsLenina
    // },
    // restDonationsSchool(state) {
    //   return state.restDonationsSchool
    // },
    sumBaker(state) {
      return state.sumBaker
    },
    resetError(state) {
      return state.resetError
    },
    usersBaker (state) {
      return state.usersBaker
    },
    usersSchool (state) {
      return state.usersSchool
    },
    isAuthenticated (state) {
      return state.idToken
    },
    // donations (state) {
    //   return state.loadDonation
    // },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    success (state) {
      return state.success
    }
  },
  modules: {
    smeta
    // donors
  }

})

export default store
