import axios from "@/config/api.config"

const path = "/open/unit"

export default {
    getUnit() {
        return axios.get(path + '/info')
    },
}
