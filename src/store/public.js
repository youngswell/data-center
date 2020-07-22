class storage{
    constructor(userName) {
        this.userName = userName;
        this.get = this.getItem;
        this.set = this.setItem;
    }
    static getItem(key) {
        const data = this.getStorageItem()[key]
        if (data) {
            return  {[key]: localStorage}
        } else {
            return new Error(key + "is undefined!")
        }
    }
    static setItem(key,value) {
        const data = this.getStorageItem()[key]
        data[key] = value
    }
    static getStorageItem() {
        let data = localStorage[this.userName || "default"]
        if (typeof data === "string") {
            try {
                data = JSON.parse(data)
            } catch (e) {
                console.error(e)
            }
        }
        return data
    }
    static setStorageItem(data) {
        localStorage[this.userName || "default"] = JSON.stringify(data)
    }
}
export default storage