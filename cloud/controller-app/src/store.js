import Vue from 'vue';
import Vuex from 'vuex';
import client from 'api-client';

Vue.use(Vuex);

function notify(type, response) {
  Vue.notify({
    group: 'main',
    title: `${response.status}: ${response.statusText}`,
    text: response.data,
    type: type,
    data: response
  });
}

const store = new Vuex.Store({
  state: {
    config: {},
    configOptions: [],
    stats: {},
    messages: {},
    debugMessage: {},
    drivingMessage: {},
    settings: {}
  },

  getters: {
    settings: state => {
      return state.settings;
    }
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
    setSettings(state, settings) {
      this._vm.$session.set('settings', settings);
      state.settings = settings;
    }
  },

  actions: {
    // Config
    getConfig({ commit }) {
      return client
        .getConfig()
        .then(config => commit('setConfig', config))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    updateConfig({ commit }, payload) {
      return client
        .updateConfig(payload)
        .then(config => commit('setConfig', config))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    // ConfigOptions
    getConfigOptions({ commit }) {
      return client
        .getConfigOptions()
        .then(configOptions => commit('setConfigOptions', configOptions))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    // Stats
    getStats({ commit }) {
      return client
        .getStats()
        .then(stats => commit('setStats', stats))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    // Messages
    getMessages({ commit }) {
      return client
        .getMessages()
        .then(messages => commit('setMessages', messages))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    // DebugMessages
    createDebugMessage({ commit }) {
      return client
        .createDebugMessage()
        .then(debugMessage => commit('setDebugMessage', debugMessage))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    // DrivingMessages
    createDrivingMessage({ commit }) {
      return client
        .createDrivingMessage()
        .then(drivingMessage => commit('setDrivingMessage', drivingMessage))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    // Settings
    getSettings({ commit }) {
      if (!this._vm.$session.exists()) {
        this._vm.$session.start();
      }
      if (!this._vm.$session.get('settings')) {
        return client
          .getSettings()
          .then(settings => commit('setSettings', settings))
          .catch(error => {
            notify('warn', error.response);
          });
      }
      return commit('setSettings', this._vm.$session.get('settings'));
    },
    updateSettings({ commit }, payload) {
      return client
        .updateSettings(payload)
        .then(settings => commit('setSettings', settings))
        .catch(error => {
          notify('warn', error.response);
        });
    },
    resetSettings({ commit }) {
      if (!this._vm.$session.exists()) {
        this._vm.$session.start();
      }
      this._vm.$session.clear();
      return client
        .getSettings()
        .then(settings => commit('setSettings', settings))
        .catch(error => {
          notify('warn', error.response);
        });
    }
  }
});

export default store;
