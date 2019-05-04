<template>
  <div>
    <v-navigation-drawer
      v-model="drawer.open"
      :clipped="drawer.clipped"
      width="210"
      :temporary="drawer.temporary"
      :fixed="drawer.fixed"
      app
    >
      <v-list dense>
        <template v-for="(item, index) in navigationBar.items">
          <!-- child menus -->
          <v-list-group prepend-icon="list" :key="index" v-if="item.children">
            <v-list-tile slot="activator" :to="{ name: item.name }">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-for="(child, idx) in item.children"
              :to="{ name: child.name }"
              :key="idx"
              class="pl-3"
            >
              <v-list-tile-action>
                <v-icon v-html="child.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="child.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          <!-- parent menus -->
          <v-list-tile :to="{ name: item.name }" :key="index" v-else>
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-2"
      :clipped-left="toolbar.clipped"
      height="48"
      dark
      app
    >
      <v-toolbar-side-icon
        @click.stop="drawer.open = !drawer.open"
      ></v-toolbar-side-icon>
      <v-toolbar-title>{{ toolbar.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data: () => ({
    drawer: {
      open: false,
      clipped: true,
      temporary: false,
      fixed: true
    },
    toolbar: {
      clipped: true,
      title: 'Cloud Derby Driving Controller'
    },
    navigationBar: {
      items: [
        {
          name: 'home',
          title: 'Home',
          icon: 'home'
        },
        {
          name: 'config',
          title: 'Config',
          icon: 'directions_car'
        },
        {
          name: 'stats',
          title: 'Stats',
          icon: 'list'
        },
        {
          name: 'messages',
          title: 'Messages',
          icon: 'list',
          children: [
            {
              name: 'messages_driving',
              title: 'Driving',
              icon: 'commute'
            },
            {
              name: 'messages_debug',
              title: 'Debug',
              icon: 'bug_report'
            }
          ]
        },
        {
          name: 'settings',
          title: 'Settings',
          icon: 'settings'
        }
      ]
    }
  }),

  props: {
    source: String
  }
};
</script>
