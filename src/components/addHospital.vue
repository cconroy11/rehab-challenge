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
      <v-card-title class="py-2 hospital-title blue darken-1">Hospital Info</v-card-title>
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
              <v-row>
                <v-col class="pt-0" cols="5">
                  <v-text-field
                    v-model="hospital.city"
                    label="City"
                    :rules="cityRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="pt-0" cols="3">
                  <v-text-field
                    v-model="hospital.state"
                    label="State"
                    :rules="stateRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="pt-0" cols="4">
                  <v-text-field
                    v-model="hospital.zip"
                    label="Zip"
                    :rules="zipRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
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
        address: "",
        city: "",
        state: "",
        zip: ""
      },
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => v.length == 10 || 'Number must be 10 characters',
        v => Number.isInteger(Number(v)) || "Must be numbers"
      ],
      addressRules: [
        v => !!v || 'Address is required',
      ],
      cityRules: [
        v => !!v || 'City is required',
      ],
      stateRules: [
        v => !!v || 'State is required',
        v => v.length == 2 || 'State must be 2 characters',
      ],
      zipRules: [
        v => !!v || 'Zip is required',
        v => v.length == 5 || 'zip must be 5 characters',
        v => Number.isInteger(Number(v)) || "Must be numbers"
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
        address: this.hospital.address,
        city: this.hospital.city,
        state: this.hospital.state,
        zip: this.hospital.zip
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
        address: "",
        city: "",
        state: "",
        zip: ""
      };
    }
  }
    
};
</script>
 
<style scoped>
::v-deep .hospital-title {
  font-family: 'Oxygen', sans-serif;
  color: #fff;
  font-size: 24px !important;
  font-weight: 700 !important;
}
.add-btn {
  z-index: 9999;
}
.form {
  width: 100%;
  padding: 0 5px;
}
</style>