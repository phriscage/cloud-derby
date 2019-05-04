<template>
  <v-app id="app">
    <Header></Header>
    <Notification></Notification>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'app',
  components: {
    Header,
    Notification
  },
  props: {
    source: String
  }
};
</script>
