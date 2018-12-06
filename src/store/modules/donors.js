// import list from "../../data/members-shetinina"
import axios from '../../axios-auth'
import globalAxios from 'axios'

const state = {
  idToken: null,
  userId: null,
  user: null,
  users: [],
  // tuser: "test"
	// list: [] 
};

// login ({commit}) {
//     axios.post('/verify')
//       .then(res => {
//         console.log(res)
//         commit('authUser', {
//           token: res.data.idToken,
//           userId: res.data.localId
        
      
const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token,
    state.userId = userData.userId
  },
  storeUserM (state, payload) {
    state.users = payload
  },
  clearAuthData (state) {
    state.IdToken = null,
    state.userId = null
  }
};
const actions = {
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
        // dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => console.log(error))
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

        // dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => console.log(error))
  },
  logout({commit}) {
    commit('clearAuthData')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // this.$router.replace('/signin')
  },
  storeUser ({commit, state}, userData) {
    if (!state.idToken) {
      return
    }
    // globalAxios.post('/users.json')
    globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }  
};
//   getUsers ({commit, state}) {
//     if (!state.idToken) {
//       return
//     }
//     globalAxios.get('/users.json')
//       .then(res => {
//         console.log(res)
//         const data = res.data
//         const users =[]
//         for (let key in data) {
//           const user = data[key]
//           user.id = key
//           users.push(user)
//         }
//         console.log(users)
//         console.log(users[1])
//         console.log(users[1].email)
//         commit('storeUserM', users)             
//       })  
//       .catch(error => console.log(error));
// };

const getters = {
  gusers (state) {               
    return state.users
  },
  isAuthenticated (state) {
    return state.idToken !==null
  }   
};

export default {
	state,
	actions,
	mutations,
	getters
};