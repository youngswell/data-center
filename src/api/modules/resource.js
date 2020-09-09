import axios from "@/config/api.config"
const path = '/open/metadata'
export default {
    getCategory() {
        return axios.get(path + '/category/info')
    },
    getCategoryByPid(pid) {
        return axios.get(path + '/category/child/' + pid)
    },
}
