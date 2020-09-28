<template>
  <div class="site-content">
    <router-back />
    <v-row align="center" justify="center">
      <v-col class="mt-5" cols="10" sm="8" md="4">
        <v-form @keyup.native.enter="handleLogin">
          <v-text-field
            v-model="user.username"
            label="Username"
            name="username"
            prepend-icon="mdi-account"
            :error-messages="message.userMessage"
            required
            type="text"
          />
          <v-text-field
            v-model="user.password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            :error-messages="message.passMessage"
            required
            type="password"
          />
          <v-btn class="float-right" color="primary" @click="handleLogin">
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import User from '../models/user';
import routerBack from '../components/routerBack';

export default {
  name: 'Login',
  components: {
    'router-back': routerBack,
  },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/');
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    }
  }
};
</script>

<style scoped>

</style>