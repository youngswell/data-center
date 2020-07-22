import { Loading } from "element-ui";

export default function (options, duration) {
    if (duration) {
        return new Promise(resolve => {
            let loadingInstance = Loading.service({
                text: "加载中...",
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
            text: "加载中...",
            background: "rgba(0,0,0,.3)",
            ...options
        })
    }
}