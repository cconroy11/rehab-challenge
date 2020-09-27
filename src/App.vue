<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-toolbar dark class="primary site-header" color="darken-2">
          <v-icon large class="mr-2" color="">mdi-hospital-building</v-icon><span class="site-title">Hospital Management</span>
          <v-spacer></v-spacer>
          <router-link v-if="!currentUser" to="/login" class="nav-link">
            <v-btn icon>
              <v-icon>mdi-account-arrow-right</v-icon>
            </v-btn>
          </router-link>
          <v-btn v-else icon href @click.prevent="logOut">
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
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