/* eslint-disable no-use-before-define */
import Vue from 'vue';
import Router from 'vue-router';

import WandaSet from '../components/WandaSet.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Wanda',
    component: WandaSet,
  },
  {
    path: '/about',
    name: 'about',
    template: '<p>about page</p>',
    created() {
      console.log('about created');
    },
  },
  ],
});

function castRouteParams(route) {
  return {
    itemid: Number(route.params.itemid),
  };
}
