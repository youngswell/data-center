const files = require.context(".", false , /\.js$/);
let list = [];
files.keys().forEach(key => {
    const item = files(key).default;
    if (key === ".home.js" || !item) return
    list = [
        ...list,
        item
    ]
})
export default list