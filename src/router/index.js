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
      path: '/:wanndaProp/:wielangwegProp',
      name: 'wannda',
      component: WandaSet,
      props: true,
    },
  ],
  mode: 'history',
});