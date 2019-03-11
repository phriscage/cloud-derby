import Vue from 'vue';
import Router from 'vue-router';
const routerOptions = [
  {
    path: '/',
    name: 'home',
    component: 'Home'
  },
  {
    path: '/config',
    name: 'config',
    component: 'Config'
  },
  {
    path: '/messages',
    name: 'messages',
    component: 'Messages'
    //meta: { auth: true }
  },
  {
    path: '/messages/driving',
    name: 'messages_driving',
    component: 'DrivingMessages'
    //meta: { auth: true }
  },
  {
    path: '/messages/debug',
    name: 'messages_debug',
    component: 'DebugMessages'
    //meta: { auth: true }
  },
  {
    path: '/stats',
    name: 'stats',
    component: 'Stats'
    //meta: { auth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: 'Settings'
  }
];

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
  };
});

Vue.use(Router);

export default new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
});
