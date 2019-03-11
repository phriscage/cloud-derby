<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-card v-else>
        <v-img
          class="white--text"
          :src="require('../assets/skyline.jpg')"
          aspect-ratio="5.75"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <span class="headline">Configuration</span>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">
              Car ID: <span class="grey--text">{{ config.carId }}</span>
            </div>
          </div>
        </v-card-title>

        <v-card-text>
          <form>
            <v-select
              v-model="config.ballColor"
              :items="configOptions.ballColors"
              :placeholder="config.ballColor"
              label="Ball Color"
              v-validate="'required'"
              :error-messages="errors.collect('ballColor')"
              data-vv-name="ballColor"
              required
            ></v-select>
            <v-select
              v-model="config.currentDrivingMode"
              :items="configOptions.drivingModes"
              :placeholder="config.currentDrivingMode"
              label="Current Driving Mode"
              v-validate="'required'"
              :error-messages="errors.collect('currentDrivingMode')"
              data-vv-name="currentDrivingMode"
              required
            ></v-select>
            <v-text-field
              v-model="config.commandTopic"
              label="Command Topic"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="config.sensorSubscription"
              label="Sensor Subscription"
              readonly
            ></v-text-field>
            <v-switch
              v-model="config.listenerStatus"
              label="Listener Status"
              :checked="config.listenerStatus"
              :error-messages="errors.collect('listenerStatus')"
              data-vv-name="listenerStatus"
            ></v-switch>
            <v-btn :disabled="!isFormDirty" @click="update">update</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
  name: 'config-card',
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    loading: false,
    dictionary: {
      attributes: {
        email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        select: {
          required: 'Select field is required'
        },
        ballColor: {
          required: 'Ball Color field is required'
        },
        currentDrivingMode: {
          required: 'Current Driving Mode field is required'
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize('en', this.dictionary);
  },

  computed: {
    config() {
      return this.$store.state.config;
    },
    configOptions() {
      return this.$store.state.configOptions;
    },
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    }
  },

  created() {
    this.loadConfig();
  },

  methods: {
    loadConfig() {
      this.loading = true;
      this.$store.dispatch('getConfigOptions').then(() => {
        this.loading = false;
      });
      this.$store.dispatch('getConfig').then(() => {
        this.loading = false;
      });
    },
    update() {
      console.log('update clicked');
      this.$validator.validateAll().then(result => {
        console.log(this.config);
        // success
        if (result) {
          this.loading = true;
          this.$store.dispatch('updateConfig', this.config).then(() => {
            this.loading = false;
            console.log(this.$store.state.config);
          });
          return;
        }
        alert('Correct the errors!');
      });
    }
  }
};
</script>
