import store from './../../store';
import axios from 'axios';
import mock from './../mock';

// set the default Accept header to application/json
axios.defaults.headers.common['Accept'] = 'application/json';

// set the default validContentTypes
const validContentTypes = [
  'application/json',
  'application/json; charset=utf-8'
];

// reject anything that is not application/json
axios.interceptors.response.use(
  response => {
    return validContentTypes.includes(response.headers['content-type'])
      ? response.data
      : Promise.reject('Content-Type: application/json is required');
  },
  // 404 is considered an error
  error => {
    if (error.response) {
      return validContentTypes.includes(error.response.headers['content-type'])
        ? error.response.data
        : Promise.reject('Content-Type: application/json is required');
    }
    // network error
    return Promise.reject(error);
  }
);

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
  createDebugMessage(payload) {
    return axios
      .post(this._apiBaseUrl() + '/messages/debug', payload)
      .then(response => response.data);
  },
  createDrivingMessage(payload) {
    return axios
      .post(this._apiBaseUrl() + '/messages/driving', payload)
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
