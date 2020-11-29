import axios from "@/config/api.config"

export default {
    getProjects() {
        return axios.get("/xmgl/project/info")
    },
    getList(data) {
        return axios.get("/xmgl/levy/info", { params: data })
    },
}
