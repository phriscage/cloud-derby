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
              <span class="headline">Driving Messages</span>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-text>
          <form @submit.prevent="submit">
            <v-text-field
              v-model="form.turnSpeed.value"
              :error-messages="errors.collect('turnSpeed')"
              mask="####"
              label="Turn Speed"
              v-validate="form.turnSpeed.validate"
              :hint="form.turnSpeed.hint"
              data-vv-name="turnSpeed"
            ></v-text-field>
            <v-text-field
              v-model="form.angle.value"
              :error-messages="errors.collect('angle')"
              mask="####"
              label="Angle"
              v-validate="form.angle.validate"
              :hint="form.angle.hint"
              data-vv-name="angle"
            ></v-text-field>
            <v-text-field
              v-model="form.driveSpeed.value"
              :error-messages="errors.collect('driveSpeed')"
              mask="####"
              label="Drive Speed"
              v-validate="form.driveSpeed.validate"
              :hint="form.driveSpeed.hint"
              data-vv-name="driveSpeed"
            ></v-text-field>
            <v-text-field
              v-model="form.distance.value"
              :error-messages="errors.collect('distance')"
              mask="####"
              label="Distance"
              v-validate="form.distance.validate"
              :hint="form.distance.hint"
              data-vv-name="distance"
            ></v-text-field>
            <v-switch
              v-model="form.gripperOpen.value"
              :error-messages="errors.collect('gripperOpen')"
              :checked="form.gripperOpen.placeholder"
              :value="true"
              label="Gripper Open"
              data-vv-name="gripperOpen"
            ></v-switch>
            <v-switch
              v-model="form.gripperClosed.value"
              :error-messages="errors.collect('gripperClosed')"
              :checked="form.gripperClosed.placeholder"
              :value="true"
              label="Gripper Closed"
              data-vv-name="gripperClosed"
            ></v-switch>
            <v-switch
              v-model="form.ondemandMessages.value"
              :error-messages="errors.collect('ondemandMessages')"
              :checked="form.ondemandMessages.placeholder"
              :value="true"
              label="OnDemand Messages"
              data-vv-name="ondemandMessages"
            ></v-switch>
            <v-switch
              v-model="form.nonstopMessages.value"
              :error-messages="errors.collect('nonstopMessages')"
              :checked="form.nonstopMessages.placeholder"
              :value="true"
              label="Non Stop Messages"
              data-vv-name="nonstopMessages"
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
  name: 'driving-messages-card',
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    loading: false
  }),

  // mounted() {
  // this.$validator.validate();
  // },

  computed: {
    form() {
      return {
        turnSpeed: {
          validate: 'min_value:0|max_value:1000',
          hint: 'valid entries: 0-1000'
        },
        angle: {
          validate: 'min_value:0|max_value:1000',
          hint: 'valid entries: 0-1000'
        },
        driveSpeed: {
          validate: 'min_value:0|max_value:1000',
          hint: 'valid entries: 0-1000'
        },
        distance: {
          validate: 'min_value:0|max_value:5000',
          hint: 'valid entries: 0-5000 (mm)'
        },
        gripperOpen: {
          placeholder: false
        },
        gripperClosed: {
          placeholder: false
        },
        ondemandMessages: {
          placeholder: false
        },
        nonstopMessages: {
          placeholder: false
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

  methods: {
    submit() {
      console.log('submit clicked');
      this.$validator.validateAll().then(result => {
        console.log(this.form);
        // success
        if (result) {
          this.loading = true;
          this.$store.dispatch('createDrivingMessage').then(() => {
            this.loading = false;
            console.log(this.$store.state.drivingMessage);
          });
          return;
        }
        alert('Corret the errors!');
      });
    }
  }
};
</script>
