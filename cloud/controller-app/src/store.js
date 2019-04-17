import Vue from 'vue';
import Vuex from 'vuex';
import client from 'api-client';

Vue.use(Vuex);

// set a custom notification template for all API calls
function notify(error) {
  var title, text, type;
  var data = {};
  if (error.response) {
    title = `${error.response.status}: ${error.response.statusText}`;
    text = error.response.data;
    data = error.response;
    type = 'warn';
  } else {
    // network error
    title = 'Network error has occured';
    text = error;
    type = 'error';
  }
  Vue.notify({
    group: 'main',
    title: title,
    text: text,
    type: type,
    data: data
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
          notify(error);
        });
    },
    updateConfig({ commit }, payload) {
      return client
        .updateConfig(payload)
        .then(config => commit('setConfig', config))
        .catch(error => {
          notify(error);
        });
    },
    // ConfigOptions
    getConfigOptions({ commit }) {
      return client
        .getConfigOptions()
        .then(configOptions => commit('setConfigOptions', configOptions))
        .catch(error => {
          notify(error);
        });
    },
    // Stats
    getStats({ commit }) {
      return client
        .getStats()
        .then(stats => commit('setStats', stats))
        .catch(error => {
          notify(error);
        });
    },
    // Messages
    getMessages({ commit }) {
      return client
        .getMessages()
        .then(messages => commit('setMessages', messages))
        .catch(error => {
          notify(error);
        });
    },
    // DebugMessages
    createDebugMessage({ commit }) {
      return client
        .createDebugMessage()
        .then(debugMessage => commit('setDebugMessage', debugMessage))
        .catch(error => {
          notify(error);
        });
    },
    // DrivingMessages
    createDrivingMessage({ commit }) {
      return client
        .createDrivingMessage()
        .then(drivingMessage => commit('setDrivingMessage', drivingMessage))
        .catch(error => {
          notify(error);
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
            notify(error);
          });
      }
      return commit('setSettings', this._vm.$session.get('settings'));
    },
    updateSettings({ commit }, payload) {
      return client
        .updateSettings(payload)
        .then(settings => commit('setSettings', settings))
        .catch(error => {
          notify(error);
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
          notify(error);
        });
    }
  }
});

export default store;
