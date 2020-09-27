<template>
  <v-card
    class="mx-auto"
  >
  <v-card-title>{{ hospital.name }}</v-card-title>

  <v-card-text>
    <div><v-icon left>mdi-phone</v-icon>{{ hospital.phone_number }}</div>
    <div><v-icon left>mdi-map-marker</v-icon>{{ hospital.address }}</div>
  </v-card-text>

  <v-divider class="mx-4"></v-divider>

  <v-card-actions v-if="loggedIn && isAdmin">
    <edit-hospital :hospital="thisHospital" @refreshData="refreshData" />
    <v-spacer />
    <v-btn
      color="red lighten-2"
      text
      @click="deleteItem()"
    >
      Delete
    </v-btn>
  </v-card-actions>
</v-card>
</template>
 
<script>
import axios from "../services/axios";
import editHospital from './editHospital';
 
export default {
  name: "hospital",
  components: {
    'edit-hospital': editHospital,
  },
  props: ["hospital"],
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      return this.$store.state.auth.status.isAdmin;
    },
    thisHospital() {
      return this.hospital;
    }
  },
  methods: {
    deleteItem() {
      axios
        .delete("/hospital/" + this.hospital.id)
        .then(response => {
          console.log(response.data);
          this.refreshData();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshData() {
      this.$emit("refreshData");
    },
  }
};
</script>