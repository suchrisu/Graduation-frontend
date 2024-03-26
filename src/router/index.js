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
      isAuth: false,
      isManager: false
    }
  },
  // {
  //   path: "/chat",
  //   name: "chat",
  //   component: ()=> import("../views/chat/ChatView.vue")
  // },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue'),
    meta:{
      isAuth: true,
      isManager: false
    },
    children: [
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('../views/manager/ManagerView.vue'),
        meta:{
          isAuth: true,
          isManager: true
        },
        children: [
          {
            path: 'userManage/user',
            name: 'user',
            component:() => import('../views/manager/userManage/UserView.vue'),
            meta:{
              isAuth: true,
              isManager: true
            }  
          }
        ]
      },
      {
        path: 'chatHome',
        name: 'ChatHome',
        component: () => import('../views/pages/chatHome/index.vue'),
        meta:{
          isAuth: true,
          isManager: false
        }
      },
      {
        path: 'knowledgeBase',
        name: 'KnowledgeBase',
        component: () => import('../views/pages/KnowledgeBaseView.vue'),
        meta:{
          isAuth: true,
          isManager: false
        }
      }
      
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.meta.isAuth==true){
    if(to.meta.isManager==true){
      let currentUser = sessionStorageGet("currentUser")
      if(currentUser.rolePowerId >=2 ){
        ElMessage.error("无权限!")
        console.log(from)
        router.push({
          name: 'ChatHome'
        });
        return;
      }
    }
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
