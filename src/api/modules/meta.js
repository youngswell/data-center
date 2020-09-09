import axios from "@/config/api.config"

const path = "/metadata"

export default {
    category() {
        return axios.get(path + '/category/info')
    },
    getCategoryByPId(id) {
        return axios.get(path + '/category/info/' + id)
    },
    add(data) {
        return axios.post(path, data)
    },
    del(id) {
        return axios.delete(path + id)
    },
}
