import Vuex from "vuex";

export const loaddata = ({commit}) => {
  Vue.http.get('data.json')
    .then(response => response.json())
    .then(data => {
      if(data) {
        const list = data.list;
        commit('SET_LIST', list);
      }
    });
};