import axios from "@/config/api.config"
const path = '/resource'
export default {
    category() {
        return axios.get(path + '/category')
    },
}
