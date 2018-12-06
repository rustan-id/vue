import rows from "../../data/smeta-shetinina.js"

const state = {
	rows: [] 
};

const mutations = {
  'SET_ROWS' (state, rows) {
  	state.rows = rows;
  }
};

const actions = {  
  initRows: ({commit}) => {
  	commit('SET_ROWS', rows);
  }
};

const getters = {
	rows: state => {
		return state.rows;
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};

