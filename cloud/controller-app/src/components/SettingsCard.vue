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
          :src="require('../assets/settings.jpg')"
          aspect-ratio="5.75"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <span class="headline">Settings</span>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">
              Session ID:
              <span class="grey--text">{{ $session.id() }}</span>
            </div>
          </div>
        </v-card-title>

        <v-card-text>
          <form>
            <v-text-field
              v-model="settings.clientId"
              label="Client ID"
              v-validate="'required|max:36'"
              :counter="36"
              :error-messages="errors.collect('clientId')"
              data-vv-name="clientId"
              required
            ></v-text-field>
            <v-text-field
              v-model="settings.clientSecret"
              label="Client Secret"
              v-validate="'required|max:36'"
              :counter="36"
              :error-messages="errors.collect('clientSecret')"
              data-vv-name="clientSecret"
              required
            ></v-text-field>
            <v-text-field
              v-model="settings.apiBaseUrl"
              :placeholder="settings.apiBaseUrl"
              label="API Base URL"
              :error-messages="errors.collect('apiBaseUrl')"
              data-vv-name="apiBaseUrl"
              required
            ></v-text-field>
            <v-text-field
              v-model="settings.authBaseUrl"
              :placeholder="settings.authBaseUrl"
              label="Authorization Base URL"
              :error-messages="errors.collect('authBaseUrl')"
              data-vv-name="authBaseUrl"
              required
            ></v-text-field>
            <v-btn :disabled="!isFormDirty" @click="update">update</v-btn>
            <v-btn @click="reset">reset</v-btn>
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
  name: 'settings-card',
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    loading: false,
    dictionary: {
      attributes: {
        apiBaseUrl: 'API Base URL Address',
        authBaseUrl: 'Authorization Base URL Address'
      },
      custom: {
        clientId: {
          required: () => 'Client ID can not be empty',
          max: 'The clientId field may not be greater than 36 characters'
        },
        clientSecret: {
          required: () => 'Client Secret can not be empty',
          max: 'The clientSecret field may not be greater than 36 characters'
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize('en', this.dictionary);
  },

  computed: {
    settings() {
      return this.$store.state.settings;
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
      this.$store.dispatch('getSettings').then(() => {
        this.loading = false;
      });
    },
    update() {
      console.log('update clicked');
      this.$validator.validateAll().then(result => {
        console.log(this.settings);
        // success
        if (result) {
          this.loading = true;
          this.$store.dispatch('updateSettings', this.settings).then(() => {
            this.loading = false;
            console.log(this.$store.state.settings);
          });
          return;
        }
        alert('Correct the errors!');
      });
    },
    reset() {
      console.log('reset clicked');
      this.loading = true;
      this.$store.dispatch('resetSettings').then(() => {
        this.loading = false;
      });
    }
  }
};
</script>
