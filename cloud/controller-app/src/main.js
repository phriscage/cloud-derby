import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueForm from 'vue-form';
import '@/plugins/vuetify';
import '@/plugins/vue-session';

Vue.config.productionTip = false;

// Enable vue-form
Vue.use(VueForm);

// Fetch and load the store settings
store.dispatch('getSettings');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
