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
          :src="require('../assets/statistics.jpg')"
          aspect-ratio="5.75"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <span class="headline">Statistics</span>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-text>
          <form>
            <v-text-field
              v-model="stats.totalErrors"
              label="Total Errors"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="stats.totalMessagesSent"
              label="Total Messages Sent"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="stats.totalMessagesReceived"
              label="Total Messages Received"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="stats.rejectedFormatMessages"
              label="Rejected Format Messages"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="stats.rejectedOutOfOrderMessages"
              label="Rejected Out Of Ordre Messages"
              readonly
            ></v-text-field>
            <v-btn @click="refresh">refresh</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'stats-card',
  data: () => ({
    loading: false
  }),

  computed: {
    stats() {
      return this.$store.state.stats;
    }
  },

  created() {
    this.loadStats();
  },

  methods: {
    loadStats() {
      this.loading = true;
      this.$store.dispatch('getStats').then(() => {
        this.loading = false;
      });
    },
    refresh() {
      console.log('refresh clicked');
      this.loadStats();
    }
  }
};
</script>
