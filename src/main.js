import _ from 'lodash';
import Vue from 'vue';

import App from './App.vue';
import Router from './router';
import Store from './store';


Vue.config.productionTip = false;
Vue.prototype._ = _;
new Vue({
  render: h => h(App),
  router: Router,
  store: Store,
  data: {

  },

}).$mount('#app');
