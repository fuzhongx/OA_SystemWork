import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import router from './router/router'
import '@/util/svg'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/assets/svg/iconfont/iconfont.css'

const app=createApp(App)
// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
const debounce = (fn, delay) => {
    let timer
     return (...args) => {
       if (timer) {
         clearTimeout(timer)
       }
       timer = setTimeout(() => {
         fn(...args)
       }, delay)
     }
  }
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
   constructor(callback) {
     callback = debounce(callback, 10);
     super(callback);
   }
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.component('svg-icon',SvgIcon)
app.use(router)
app.mount('#app')




