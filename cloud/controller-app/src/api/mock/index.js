import config from './data/config';
import configOptions from './data/config/options';
import stats from './data/stats';
import messages from './data/messages';
import settings from './data/settings';

const uuid4 = require('uuid4');

const get = (mockData, time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });
};

// create a unique ID for all POST operations for now
const create = (time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: uuid4() });
    }, time);
  });
};

const update = (data, time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export default {
  getConfig() {
    return get(config, 1000); // wait 1s before returning config
  },
  updateConfig(payload) {
    return update(payload, 1000);
  },
  getConfigOptions() {
    return get(configOptions, 1000); // wait 1s before returning config
  },
  getStats() {
    return get(stats, 1000); // wait 1s before returning config
  },
  getMessages() {
    return get(messages, 1000); // wait 1s before returning config
  },
  createDebugMessage() {
    return create(1000);
  },
  createDrivingMessage() {
    return create(1000);
  },
  getSettings() {
    return get(settings, 100); // wait 100ms before returning
  },
  updateSettings(payload) {
    return update(payload, 100); // wait 100ms before returning
  },
  resetSettings() {
    return get(settings, 100); // wait 100ms before returning
  }
};
