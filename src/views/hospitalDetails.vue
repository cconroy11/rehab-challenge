<template>
  <div>
    <v-row class="site-content">
      <router-back />
      <v-col cols="12">
        <hospital-detail :hospital="hospital" />
      </v-col>
      <v-col cols="12">
        <hospital-enquiry :hospitalId="hospital.id" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import routerBack from '../components/routerBack';
import hospitalDetail from '../components/hospitalDetail';
import hospitalEnquiry from '../components/hospitalEnquiry';

export default {
  name: 'hospital-details',
  components: {
    'router-back': routerBack,
    'hospital-detail': hospitalDetail,
    'hospital-enquiry': hospitalEnquiry,
  },
  props: ["hospital"],
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      return this.$store.state.auth.status.isAdmin;
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
</style>
