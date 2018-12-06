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
		restCost: 20000,
		loadDonation: [],
		idToken: null,
	  userId: null,
	  user: null,
	  users: [],
	  loading: false,
	  error: null
	},
	mutations: {
		createDonation (state, payload) {
			state.loadDonation.push(payload)
		},
		authUser (state, userData) {
	    state.idToken = userData.token,
	    state.userId = userData.userId
	  },
    storeUserM (state, payload) {
      state.users = payload
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
    }
	},
	actions: {
		createDonation({commit}, payload) {
			const donations = {
				donation: payload.donation,
				pseudo: payload.pseudo
			}
			commit('createDonation', donations)

		},
	  setLogoutTimer({commit}, expirationTime) {
	    setTimeout(() => {
	      commit('clearAuthData')
	    }, expirationTime * 1000)
	  },
	  fetchUser ({commit, state}) {
	    if (!state.idToken) {
	      return
	    }
	    globalAxios.get('/users.json' + '?auth=' + state.idToken)
	      .then(res => {
	        console.log(res)
	        const data = res.data
	        const users =[]
	        for (let key in data) {
	          const user = data[key]
	          user.id = key
	          users.push(user)
	        }
	        commit('storeUserM', users)        
	      })   
	      .catch(error => console.log(error));
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
	        router.replace('/donors-shetinina')
	        router.go({path: router.path})
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
	  login ({commit, dispatch}, authData) {
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
	        router.go({path: router.path})
	        router.replace('/donors-shetinina')
	        

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
	  storeUser ({commit, state}, userData) {
	    if (!state.idToken) {
	      return
	    }
	    // globalAxios.post('/users.json')
	    globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
	    .then(res => console.log(res))
	    .catch(error => console.log(error))
	  },
	  signUserIn({commit}, payload) {
	  	commit('setLoading', true)
	  	commit('clearError')
	  	firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
	  	  .then(user => {
	  	  	  commit('setLoading', false)
	  	  		const newUser = {
	  	  			id: user.uid,
	  	  			donationData: []       
	  	  		}
	  	  		commit('setUser', newUser)
	  	  	}
	  	  )
	  	  .catch(
	  	  	error => {
	  	  		commit('setLoading', false)
          	commit('setError', error)
	  	  		console.log(error)
	  	  })
	  },
	  signUserUp({commit}, payload) {
	  	commit('setLoading', true)
	  	commit('clearError')
	  	firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
	  	  .then(
	  	  	user => {
	  	  		commit('setLoading', false)
	  	  		const newUser = {
	  	  			id: user.uid,
	  	  			donationData: []
	  	  		}
	  	  		commit('seteUser', newUser)
	  	  	}
	  	  )
	  	  .catch(
          error => {
          	commit('setLoading', false)
          	commit('setError', error)
          	console.log(error)

          }
	  	  )
	  },
	  clearError({commit}) {
	  	commit('clearError')
	  }   
	},

	getters: {
		gusers (state) {               
	    return state.users
	  },
	  isAuthenticated (state) {
	    return state.idToken
	  },
	  donations (state) {
	  	return state.loadDonation
	  },
	  user (state) {
	  	return state.user
	  },
	  loading (state) {
	  	return state.loading
	  },
	  error (state) {
	  	return state.error
	  }
	},
	modules: {
		smeta
		// donors
	}
	
})
	
export default () => {
  return store
};