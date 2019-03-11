<template>
  <v-app id="app">
    <Header></Header>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  data: () => ({
    drawer: false,
    clipped: true
  }),

  props: {
    source: String
  }
};
</script>
