import store from './../../store';
import axios from 'axios';
import mock from './../mock';

export default {
  _apiBaseUrl() {
    return store.getters.settings.apiBaseUrl;
  },
  getConfig() {
    return axios
      .get(this._apiBaseUrl() + '/config')
      .then(response => response.data);
  },
  updateConfig(payload) {
    return axios
      .put(this._apiBaseUrl() + '/config', payload)
      .then(response => response.data);
  },
  getConfigOptions() {
    return axios
      .get(this._apiBaseUrl() + '/config/options')
      .then(response => response.data);
  },
  getStats() {
    return axios
      .get(this._apiBaseUrl() + '/stats')
      .then(response => response.data);
  },
  getMessages() {
    return axios
      .get(this._apiBaseUrl() + '/messages')
      .then(response => response.data);
  },
  createDebugMessage() {
    return axios
      .post(this._apiBaseUrl() + '/messages/debug')
      .then(response => response.data);
  },
  createDrivingMessage() {
    return axios
      .post(this._apiBaseUrl() + '/messages/driving')
      .then(response => response.data);
  },
  // default to the mock which is just a static config load
  getSettings() {
    return mock.getSettings();
  },
  // default to the mock which is just a static config load
  updateSettings(payload) {
    return mock.updateSettings(payload);
  },
  // default to the mock which is just a static config load
  resetSettings() {
    return mock.resetSettings();
  }
};
