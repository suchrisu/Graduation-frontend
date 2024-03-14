import * as Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI ,{Table} from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './mock/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import '@/styles/element-variables.scss'
window.$vueApp = Vue.createApp(App)


window.$vueApp.use(ElementUI)
window.$vueApp.use(store)
window.$vueApp.use(router)
window.$vueApp.mount('#app')
window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  window.$vueApp.component(key, component)
}


const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
 
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
