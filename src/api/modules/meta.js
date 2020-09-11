import axios from "@/config/api.config"

const path = "/open/metadata"

export default {
    category() {
        return axios.get(path + '/category/info')
    },
    getCategoryByPId(id) {
        return axios.get(path + '/category/child/' + id)
    },
    getApiListByCategoryId(params) {
        return axios.get(path + '/info', { params: params })
    },
    getApiInfoById(id) {
        return axios.get(path + '/info/' + id)
    },
    getApiInfo(id) {
        return axios.get(path + '/info/' + id)
    },
    getApiData(id) {
        return axios.get('/open/rest/info/' + id)
    },
}
