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
          :src="require('../assets/information.jpg')"
          aspect-ratio="5.75"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <span class="headline">Messages</span>
            </v-layout>
          </v-container>
        </v-img>

        <v-card-text>
          <v-list one-line subheader>
            <v-subheader>inboundMsgHistory</v-subheader>
            <v-divider></v-divider>
            <template v-for="(message, index) in messages.inboundMsgHistory">
              <v-list-tile
                :key="message.id"
                avatar
                @click="toggle(message, index)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ message.id }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ message.name }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                v-if="index + 1 < messages.inboundMsgHistory.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>

          <v-list one-line subheader>
            <v-subheader>outboundMsgHistory</v-subheader>
            <v-divider></v-divider>
            <template v-for="(message, index) in messages.outboundMsgHistory">
              <v-list-tile
                :key="message.id"
                avatar
                @click="toggle(message, index)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ message.id }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ message.name }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                v-if="index + 1 < messages.outboundMsgHistory.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
          <v-btn @click="refresh">refresh</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'messages-list',
  data: () => ({
    loading: false
  }),

  computed: {
    messages() {
      return this.$store.state.messages;
    }
  },

  created() {
    this.loadMessages();
  },

  methods: {
    loadMessages() {
      this.loading = true;
      this.$store.dispatch('getMessages').then(() => {
        this.loading = false;
      });
    },
    refresh() {
      console.log('refresh clicked');
      this.loadMessages();
    },
    toggle(message, index) {
      console.log(`toggle clicked: [${index}], ${message.id}`);
    }
  }
};
</script>
