import axios from "@/config/api.config"

export default {
    upload(url,form) {
        return axios.post(url || "/version/upload", form, null)
    },
    download(id) {
        return axios.get("/version/download?fileId=" + id)
    },
    login(data) {
        return axios.get("/auth/token", { params: data })
    },
    enums(planform) {
        return axios.get('/enum/items', { params: { enumCodes: planform } })
    },
    any() {
        return axios.get('/any')
    }
}
