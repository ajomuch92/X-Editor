import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Login from './views/Login'
import SignUp from './views/SignUp';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})