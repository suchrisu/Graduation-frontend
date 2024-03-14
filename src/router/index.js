// import  VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const originalPush = VueRouter.prototype.push
// //修改原型对象中的push方法
// // VueRouter.prototype.push = function push(location) {
// //   return originalPush.call(this, location).catch((err) => err)
// // }
// // VueRouter.prototype.replace = function replace(location) {
// //   return originalReplace.call(this, location).catch((err) => err)
// // }
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  // {
  //   path: "/chat",
  //   name: "chat",
  //   component: ()=> import("../views/chat/ChatView.vue")
  // },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/home.vue'),
    redirect: '/chat/chatHome',
    children: [
      {
        path: 'chatHome',
        name: 'ChatHome',
        component: () => import('../views/pages/chatHome/index.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
