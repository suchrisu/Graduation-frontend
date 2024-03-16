// import  VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import {sessionStorageGet} from "@/util/util"
import {ElMessage} from 'element-plus'
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
    component: () => import('../views/login/LoginView.vue'),
    meta:{
      isAuth: false
    }
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
    meta:{
      isAuth: true
    },
    children: [
      {
        path: 'chatHome',
        name: 'ChatHome',
        component: () => import('../views/pages/chatHome/index.vue'),
        meta:{
          isAuth: true
        }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.meta.isAuth==true){
    const token = sessionStorageGet("token")
    if(token != '' && token != null){
      next()
    }
    else{
    ElMessage.error("请先登录!")
    router.push({
      path:"/"
    })
    }
  }
  else{
    next()
  }
})



export default router
