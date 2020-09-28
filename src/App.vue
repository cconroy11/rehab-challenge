<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-toolbar dark class="primary site-header" color="darken-2">
          <router-link to="/" class="nav-link">
            <v-icon large class="mr-2" color="">mdi-hospital-building</v-icon><span class="site-title">Hospital Management</span>
          </router-link>
          <v-spacer></v-spacer>
          <router-link v-if="!currentUser" to="/login" class="nav-link">
            <v-btn icon>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-account-arrow-right</v-icon>
                  </template>
                  <span>Login</span>
                </v-tooltip>
            </v-btn>
          </router-link>
          <div v-else>
            <!-- //message listing fo admins to see -->
            <message-list />

            <v-btn icon href @click.prevent="logOut">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-account-arrow-left</v-icon>
                </template>
                <span>Logout</span>
              </v-tooltip>
            </v-btn>
          </div>
        </v-toolbar>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import messageList from './components/messageList';

export default {
  components: {
    'message-list': messageList,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap');

.nav-link {
  text-decoration: none;
  color: #fff !important;
}
.site-header {
  position: fixed;
  z-index: 200;
  width: 100%;
  font-family: 'Oxygen', sans-serif;
  font-size: 34px;
  font-weight: 700;
  @media (max-width: 500px) {
    .site-title{
      display: none;
    }
  }
}
</style>