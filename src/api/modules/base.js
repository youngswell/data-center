import axios from "@/config/api.config"

const path = "/home/Activity"

export default {
    upload(url,form) {
        return axios.post(path + "/upload-file",form, null)
    },
    login(data) {
        return axios.post(path + "/login",data, null)
    },
}