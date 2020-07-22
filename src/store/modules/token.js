// 存储模块
const token = localStorage.token

export default {
    state: {
        token: token
    },
    getters: {
		token: state => state.token
    },
    mutations: {
		token: (state, token) => {
            localStorage.token = token
            state.token = token;
		}
    },
    actions: {

    }
}