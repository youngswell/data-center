export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        logout({ commit }) {
            commit("token","")
            commit("user","")
        }
    }
}