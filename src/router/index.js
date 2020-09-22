import Vue from 'vue'
import VueRouter from 'vue-router'

const login = () => import(/* webpackChunkName: "login_home" */ '../components/Login.vue')
const home = () => import(/* webpackChunkName: "login_home" */ '../components/Home.vue')
const user = () => import(/* webpackChunkName: "login_home" */ '../components/User/user.vue')
const register = () => import(/* webpackChunkName: "login_home" */ '../components/inFormation/register.vue')
const studentList = () => import(/* webpackChunkName: "login_home" */ '../components/inFormation/studentList.vue')
const expend = () => import(/* webpackChunkName: "login_home" */ '../components/finance/expend.vue')

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login,
      meta: { title: '后台管理系统' }
    },
    {
      path: '/home',
      component: home,
      meta: { title: '后台管理系统' },
      children: [
        {
          path: '/user',
          component: user,
          meta: { title: '后台管理系统' }
        },
        {
          path:'/register',
          component:register,
          meta: {
            title: '后台管理系统'
          }
        },
        {
          path: '/studentList',
          component:studentList,
          meta: {
            title: '后台管理系统'
          }
        },
        {
          path: '/expend',
          component:expend,
          meta:{
            title: '后台管理系统'
          }
        }
      ]
    }
  ]
})
//   挂载路由导航守卫
router.beforeEach((to, from, next) => {
//  to即将要进入的目标 路由对象   from: 代表从哪个路径跳转而来  next是一个函数表示放行  next('/lohin')强制跳转
  if (to.path === '/login') return next()
//  获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
