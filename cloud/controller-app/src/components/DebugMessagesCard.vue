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
              <span class="headline">Debug Messages</span>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-text>
          <form @click="input" @submit.prevent="submit">
            <v-switch
              v-model="form.nextSensorMessage.value"
              :error-messages="errors.collect('nextSensorMessage')"
              :checked="form.nextSensorMessage.placeholder"
              label="Next Sensor Message"
              data-vv-name="nextSensorMessage"
              v-validate.continues="'atLeastOne'"
            ></v-switch>
            <v-switch
              v-model="form.sendCommand.value"
              :error-messages="errors.collect('sendCommand')"
              :checked="form.sendCommand.placeholder"
              label="Send Command"
              data-vv-name="sendCommand"
              v-validate.continues="'atLeastOne'"
            ></v-switch>
            <v-btn :disabled="!isFormDirty" @click="submit">submit</v-btn>
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
  name: 'debug-messages-card',
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    loading: false
  }),

  computed: {
    form() {
      return {
        sendCommand: {
          placeholder: false,
          value: false
        },
        nextSensorMessage: {
          placeholder: false,
          value: false
        }
      };
    },
    isFormDirty() {
      // v-switch does not support dirty flag... disabling for now.
      // https://github.com/vuetifyjs/vuetify/issues/5230
      //return Object.keys(this.fields).some(key => this.fields[key].dirty);
      return true;
    }
  },

  created() {
    // 'atLeastOne': a custom validator function to check if at
    // least one checkbox is selected
    this.$validator.extend('atLeastOne', {
      getMessage() {
        return `At least one item must be selected.`;
      },
      validate: () => {
        return new Promise(resolve => {
          resolve({
            valid: this.anyFormValuesTrue()
          });
        });
      }
    });
  },

  methods: {
    // work-around to clear out all errors if any value is true
    anyFormValuesTrue() {
      return Object.keys(this.form).some(key => this.form[key].value === true);
    },
    formValues() {
      return Object.keys(this.form).all(key => this.form[key].value);
    },
    input() {
      if (this.anyFormValuesTrue() && this.errors.any()) {
        console.log('clearing errors');
        this.errors.clear();
      }
    },
    submit() {
      console.log('submit clicked');
      this.$validator.validateAll().then(result => {
        console.log(this.form);
        var payload = Object.fromEntries(
          Object.entries(this.form).map(([k, v]) => [k, v.value])
        );
        // success
        if (result) {
          this.loading = true;
          this.$store.dispatch('createDebugMessage', payload).then(() => {
            this.loading = false;
            console.log(this.$store.state.debugMessage);
          });
          return;
        }
      });
    }
  }
};
</script>
