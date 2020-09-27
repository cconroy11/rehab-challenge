<template>
  <v-dialog v-if="loggedIn && isAdmin" v-model="addDialog" persistent max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        class="primary add-btn" 
        text
        right
        fixed
        bottom
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>mdi-plus</v-icon>Add hospital
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Hospital Info</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-form
              ref="form"
              v-model="valid"
              class="form"
            >
              <v-text-field
                v-model="hospital.name"
                label="Name"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
          
              <v-text-field
                v-model="hospital.phone_number"
                label="Phone Number"
                :rules="phoneRules"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="hospital.address"
                label="Address"
                :rules="addressRules"
                required
                outlined
              ></v-text-field>
            </v-form>
          </v-row>
        </v-container>
        <small>All fields are required</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clear()">Close</v-btn>
        <v-btn 
          :disabled="valid ? false : true"
          color="blue darken-1" 
          text @click="saveHospital()"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
<script>
import axios from "../services/axios";
 
export default {
  name: "add-hospital",
  data() {
    return {
      addDialog: false,
      hospital: {
        name: "",
        phone_number: "",
        address: ""
      },
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => v.length <= 11 || 'Number must be less than 12 characters',
        v => Number.isInteger(Number(v)) || "Must be numbers"
      ],
      addressRules: [
        v => !!v || 'Address is required',
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      return this.$store.state.auth.status.isAdmin;
    },
  },
  methods: {
    async saveHospital() {

      var data = {
        name: this.hospital.name,
        phone_number: this.hospital.phone_number,
        address: this.hospital.address
      };
 
      await axios
        .post("/hospital", data)
        .then(response => {
          this.hospital.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
 
      this.clear();
      this.$emit("refreshData");
    },
    clear() {
      this.$refs.form.resetValidation();
      this.addDialog = false;
      this.hospital = {
        name: "",
        phone_number: "",
        address: ""
      };
    }
  }
    
};
</script>
 
<style>
.add-btn {
  z-index: 9999;
}
.form {
  width: 100%;
  padding: 0 5px;
}
</style>