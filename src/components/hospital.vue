<template>
  <v-card
    class="mx-auto"
  >
  <router-link class="detail-link" :to="{
    name: 'hospital-details',
    params: { hospital: hospital, id: hospital.id }
  }">
    <v-card-title class="primary py-2 hospital-title">{{ hospital.name }}</v-card-title>

    <v-card-text class="py-4 hospital-body">
      <div class="item mb-3"><v-icon left>mdi-phone</v-icon>{{ formattedPhoneNumber }}</div>
      <div class="item"><v-icon left>mdi-map-marker</v-icon>
        {{ hospital.address }} <br>
        {{ hospital.city }}, {{ hospital.state }} {{ hospital.zip }}
      </div>
    </v-card-text>
  </router-link>

  <v-divider class="mx-4"></v-divider>

  <v-card-actions v-if="loggedIn && isAdmin">
    <edit-hospital :hospital="thisHospital" @refreshData="refreshData" />
    <v-spacer />
    <v-btn
      color="red lighten-2"
      text
      small
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
    },
    formattedPhoneNumber() {
      var number = this.hospital.phone_number;
      return number.toString().replace(/(\d{3})(\d{3})(\d{4})/,"($1)$2-$3");
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

<style lang="scss" scoped>
  .hospital-title {
    color: #fff;
  }
  .hospital-body {
    .v-icon.v-icon::before {
      font-size: 20px;
      line-height: 1;
    }
    .item {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.75px;
      color: #444;
    }
  }
  .detail-link {
    text-decoration: none;
    position: relative;
    transition: all ease 0.3s;
    top: 0;
    &:hover {
      top:-5px;
    }
  }
</style>