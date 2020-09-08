import { Loading } from "element-ui";

export default function (text, duration, options) {
    if (duration) {
        return new Promise(resolve => {
            let loadingInstance = Loading.service({
                text: text || "加载中...",
                background: "rgba(0,0,0,.3)",
                ...options
            })
            setTimeout(() => {
                loadingInstance.close()
                resolve()
            }, Number(duration))
        })
    } else {
        return Loading.service({
            text: text || "加载中...",
            background: "rgba(0,0,0,.3)",
            ...options
        })
    }
}
