import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
 VueRouter.prototype.replace = function replace(location) {
      return originalReplace.call(this, location).catch(err => err)
  }
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/LoginView.vue")
  },
  {
    path: "/chat",
    name: "chat",
    component: ()=> import("../views/chat/ChatView.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
