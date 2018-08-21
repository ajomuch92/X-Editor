import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Login from './views/Login'
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import Editor from './views/EditorView';
import AsyncMethods from 'vue-async-methods';

Vue.use(Router);
Vue.use(AsyncMethods);

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
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
    ,
    {
      path: '/editor/:file_id',
      name: 'Editor',
      component: Editor
    }
  ]
})