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
          <v-list>
            <v-list-group
              v-for="(key, index) in Object.keys(messages)"
              :key="index"
              prepend-icon="list"
              no-action
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ key }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                {{ messages[key].length }}
              </template>

              <v-list-tile
                v-for="(message, messageIndex) in messages[key]"
                :key="messageIndex"
                avatar
              >
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    {{ message }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-tooltip close-delay="1500" left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        @click="toggle(message, messageIndex)"
                        ripple
                      >
                        <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ message }}</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
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
      console.log(`toggle clicked: [${index}], `, message);
    }
  }
};
</script>
