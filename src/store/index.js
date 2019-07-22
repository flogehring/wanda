/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import RelativeDateType from '../mixins/DateTypes';
import { SAVE_MEMORY, DELETE_MEMORY } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,


  },

  getters: {
    findMemoryById: state => (id) => {
      // eslint-disable-next-line eqeqeq
      const stored = state.memories.find(mem => mem.id == id);
      return stored;
    },
  },

  actions: {
    increment(context) {
      context.commit('increment');
    },
    deleteItem(context, obj) {
      context.commit(DELETE_MEMORY, obj);
    },
    saveMemory(context, obj) {
      context.commit(SAVE_MEMORY, obj);
    },
  },

  mutations: {
    increment(state) {
      state.count++;
    },
    [DELETE_MEMORY](state, obj) {
      const index = state.memories.findIndex(x => x.id === obj.itemId);
      state.memories.splice((index), 1);
    },
    [SAVE_MEMORY](state, obj) {
      state.memories.push(obj);
    },
  },


});