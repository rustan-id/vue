import smetaBaker from "./../../data/smeta-baker.js"
import smetaSchool from "./../../data/smeta-school.js"

const state = {
  smetaBaker: [],
  smetaSchool: []
};
const mutations = {
  'setSmeta' (state, smetaBaker) {
    state.smetaBaker = smetaBaker;
    state.smetaSchool = smetaSchool;
  }
};
const actions = {
  initSmeta: ({commit}) => {
    commit('setSmeta', smetaBaker, smetaSchool);
  }
};
const getters = {
  smetaBaker(state) {
    return state.smetaBaker;
  },
  smetaSchool(state) {
    return state.smetaSchool;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

