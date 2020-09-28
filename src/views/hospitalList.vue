<template>
  <v-row class="site-content">
    <v-col v-for="(hospital, index) in hospitals" :key="index" cols="12" sm="6" md="4" lg="3">
      <hospital :hospital="hospital" @refreshData="refreshList()" />
    </v-col>
    <add-hospital @refreshData="refreshList()" />
  </v-row>
</template>
 
<script>
import axios from "../services/axios";
import hospital from '../components/hospital';
import addHospital from '../components/addHospital';
 
export default {
  name: "hospital-list",
  components: {
    'hospital': hospital,
    'add-hospital': addHospital,
  },
  data() {
    return {
      hospitals: []
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveHospitals() {
      axios
        .get('/hospitals')
        .then(response => {
          this.hospitals = response.data; // JSON are parsed automatically.
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveHospitals();
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveHospitals();
  }
};
</script>
 
<style>
.site-content {
  margin-top: 64px;
}
</style>