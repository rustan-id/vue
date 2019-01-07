import Vue from "vue"
import Vuex from "vuex"
import axios from './../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../router.js'
import smeta from './modules/smeta.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    usersBaker: [],
    usersSchool: [],
    error: null,
    resetError: null,
    success: false
  },
  mutations: {
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
    clearAuthData (state) {
      state.IdToken = null,
      state.userId = null
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
      state.success = true
    }
  },
  actions: {
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
          const now = new Date ()
          const expirationDate = new Date (now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', authData)
          router.replace('/donors')
        })
        .catch(error => {
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
          router.replace('/donors')
        })
        .catch(error => {
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
      router.replace('/')
    },
    storeUser ({state}, userData) {
      if (!state.idToken) {
        return
      } else if (userData.selected === "Baker Street" ) {
        globalAxios.post('/users-baker.json' + '?auth=' + state.idToken, userData)
          .then(res => {
            console.log(res)
          })
          .catch(error => console.log(error))
      } else if (userData.selected === 'School №53') {
        globalAxios.post('/users-school.json' + '?auth=' + state.idToken, userData)
          .then(res => {
            console.log(res)
          })
          .catch(error => console.log(error))
      }
    },
    clearError({commit}) {
      commit('clearError')
    },
    resetPassword({commit}, payload) {
      firebase.auth().sendPasswordResetEmail(payload).then(function() {
        commit('sentSuccess')
      }).catch(function(error) {
        commit('resetError', error)
      })
    }
  },
  getters: {
    usersBaker (state) {
      return state.usersBaker
    },
    usersSchool (state) {
      return state.usersSchool
    },
    isAuthenticated (state) {
      return state.idToken
    },
    error (state) {
      return state.error
    },
    resetError (state) {
      return state.resetError
    },
    success (state) {
      return state.success
    }
  },
  modules: {
    smeta
  }
})

export default store
