export default {
    state: {
        system: {
            clientHeight: 1080,
            clientWidth: 1920,
        }
    },
    getters: {
        system: state => state.system
    },
    mutations: {
        system: (state, system) => {
            state.system = system;
        }
    },
    actions: {
        logout({ commit }) {
            commit("token","");
            commit("user","");
        },
        lognin({ commit }, { user, token }) {
            commit("token", token);
            commit("user", user);
            return Promise.resolve()
        }
    }
}
