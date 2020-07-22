import Vue from 'vue';
import Main from './image-viewer.vue';
const Component = Vue.extend(Main);

let instance;
const instances = [];
let seed = 1;

const imageViewer = function(options) {
    // console.log('options', options);
    options = options || {};
    const id = 'img_viewer_' + seed++;

    instance = new Component({ data: {
            options
        }});
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instances.push(instance);
    return instance;
};

Vue.prototype.$imgViewer = imageViewer;

export default imageViewer;