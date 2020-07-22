const files = require.context(".", false , /\.js$/);
let list = [];
files.keys().forEach(key => {
    const item = files(key).default;
    if (key === ".home.js" || !item) return
    list = {
        ...list,
        [key.substring(2,key.length - 3)]: item
    }
})
export default list