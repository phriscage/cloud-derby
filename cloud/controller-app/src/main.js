import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueForm from 'vue-form';
import '@/plugins/vuetify';

Vue.config.productionTip = false;

// Enable vue-form
Vue.use(VueForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
