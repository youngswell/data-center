// 存储模块
let user = localStorage.user
if (typeof user === "string") {
    try {
        user = JSON.parse(user)
    } catch (e) {
        console.error(e)
    }
}

export default {
    state: {
        user: user
    },
    getters: {
		user: state => state.user
    },
    mutations: {
		user: (state, user) => {
			state.user = user;
			localStorage.user = JSON.stringify(user)
		}
    },
    actions: {

    }
}