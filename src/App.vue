<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-toolbar class="site-header">
          Hospital Management
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
        <v-container class="site-content">
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

<style scoped>
.nav-link {
  text-decoration: none;
}
.site-header {
  position: fixed;
  z-index: 200;
  width: 100%;
}
.site-content {
  margin-top: 64px;
}
</style>