import Vue from 'vue';
import Vuex from 'vuex';
import client from 'api-client';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {},
    configOptions: [],
    stats: {},
    messages: {},
    debugMessage: {},
    drivingMessage: {},
    settings: {}
  },

  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
    setConfigOptions(state, configOptions) {
      state.configOptions = configOptions;
    },
    setStats(state, stats) {
      state.stats = stats;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    setDebugMessage(state, debugMessage) {
      state.debugMessage = debugMessage;
    },
    setDrivingMessage(state, drivingMessage) {
      state.drivingMessage = drivingMessage;
    },
    // TODO this needs to be in vue-session this.$session
    setSettings(state, settings) {
      state.settings = settings;
    }
  },

  actions: {
    // Config
    getConfig({ commit }) {
      return client.getConfig().then(config => commit('setConfig', config));
    },
    updateConfig({ commit }, payload) {
      return client
        .updateConfig(payload)
        .then(config => commit('setConfig', config));
    },
    // ConfigOptions
    getConfigOptions({ commit }) {
      return client
        .getConfigOptions()
        .then(configOptions => commit('setConfigOptions', configOptions));
    },
    // Stats
    getStats({ commit }) {
      return client.getStats().then(stats => commit('setStats', stats));
    },
    // Messages
    getMessages({ commit }) {
      return client
        .getMessages()
        .then(messages => commit('setMessages', messages));
    },
    // DebugMessages
    createDebugMessage({ commit }) {
      return client
        .createDebugMessage()
        .then(debugMessage => commit('setDebugMessage', debugMessage));
    },
    // DrivingMessages
    createDrivingMessage({ commit }) {
      return client
        .createDrivingMessage()
        .then(drivingMessage => commit('setDrivingMessage', drivingMessage));
    },
    // Settings
    getSettings({ commit }) {
      return client
        .getSettings()
        .then(settings => commit('setSettings', settings));
    },
    updateSettings({ commit }, payload) {
      return client
        .updateSettings(payload)
        .then(settings => commit('setSettings', settings));
    }
  }
});
