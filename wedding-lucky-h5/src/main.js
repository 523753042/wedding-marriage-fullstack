import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import '@/assets/style/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/lib/tagcanvas.js';
import { vueBaberrage } from 'vue-baberrage'
Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(vueBaberrage);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
