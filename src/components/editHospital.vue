<template>
  <v-dialog v-model="editDialog" persistent max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="warning lighten-2"
        text
        v-bind="attrs"
        v-on="on"
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit {{ hospital.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="form"
            >
              <v-text-field
                v-model="editableHospital.name"
                label="Name"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
          
              <v-text-field
                v-model="editableHospital.phone_number"
                label="Phone Number"
                :rules="phoneRules"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="editableHospital.address"
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
          text @click="updateHospital()"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
<script>
import axios from "../services/axios";
 
export default {
  name: "edit-hospital",
  props: ["hospital"],
  data() {
    return {
      editableHospital: {
        name: this.hospital.name,
        phone_number: this.hospital.phone_number,
        address: this.hospital.address
      },
      editDialog: false,
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
  mounted() {
  },
  methods: {
    async updateHospital() {

      var data = {
        name: this.editableHospital.name,
        phone_number: this.editableHospital.phone_number,
        address: this.editableHospital.address
      };
 
      await axios
        .put("/hospital/" + this.hospital.id, data)
        .then(response => {
          console.log(response.data);
          // Send updated data to parent
          this.$emit("refreshData");
          this.editDialog = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    clear() {
      this.editDialog = false;
      this.editableHospital = {
        name: this.hospital.name,
        phone_number: this.hospital.phone_number,
        address: this.hospital.address
      }
      this.$refs.form.resetValidation();
    }
  }
    
};
</script>
 
<style>
.form {
  width: 100%;
  padding: 0 5px;
}
</style>