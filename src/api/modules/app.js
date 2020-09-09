import axios from "@/config/api.config"

const path = "/app/info/"

export default {
    list(filters) {
        return axios.get(path, { params: { ...filters } })
    },
    info(id) {
        return axios.get(path + id)
    },
    add(data) {
        return axios.post(path, data)
    },
    update(id, data) {
        return axios.patch(path + id, data)
    },
    del(id) {
        return axios.delete(path + id)
    },
    upload(form) {
        return axios.get(path + "/upload", form)
    },
    download(fileId) {
        return axios.get(path + "/download", { params: { fileId } })
    }
}
