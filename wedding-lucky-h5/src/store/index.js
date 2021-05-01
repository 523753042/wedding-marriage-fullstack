import Vue from 'vue';
import Vuex from 'vuex';
import {
  setData,
  resultField,
  newLotteryField,
  listField
} from '@/helper/index';

Vue.use(Vuex);

export const defaultConfig = {
  name: '项天宇与仲晓艳婚宴的专属抽奖',
  number: 70,
  firstPrize: 1,
  secondPrize: 3,
  thirdPrize: 5
}
export const defaultnewLottery = [{ name: '二等奖', key: 'secondPrize' }, { name: '三等奖', key: 'thirdPrize' }];
export default new Vuex.Store({
  state: {
    config: defaultConfig,
    result: {
      firstPrize: []
    },
    newLottery: defaultnewLottery,
    list: [],
    photos: [],
    attendList: []
  },
  mutations: {
    setClearConfig(state) {
      state.config = defaultConfig;
      state.newLottery = defaultnewLottery;
    },
    setClearList(state) {
      state.list = [];
    },
    setClearPhotos(state) {
      state.photos = [];
    },
    setClearResult(state) {
      state.result = {
        firstPrize: []
      };
    },
    setAttendList(state, list) {
      state.attendList = list;
    },
    setClearStore(state) {
      state.config = defaultConfig;
      state.result = {
        firstPrize: []
      };
      state.newLottery = defaultnewLottery;
      state.list = [];
      state.photos = [];
    },
    setConfig(state, config) {
      state.config = config;
    },
    setResult(state, result = {}) {
      state.result = result;

      setData(resultField, state.result);
    },
    setNewLottery(state, newLottery) {
      if (state.newLottery.find(item => item.name === newLottery.name)) {
        return;
      }
      state.newLottery.push(newLottery);
      setData(newLotteryField, state.newLottery);
    },
    setList(state, list) {
      const arr = state.list;
      list.forEach(item => {
        const arrIndex = arr.findIndex(data => data.key === item.key);
        if (arrIndex > -1) {
          arr[arrIndex].name = item.name;
        } else {
          arr.push(item);
        }
      });
      state.list = arr;

      setData(listField, arr);
    },
    setPhotos(state, photos) {
      state.photos = photos;
    }
  },
  actions: {},
  modules: {}
});
