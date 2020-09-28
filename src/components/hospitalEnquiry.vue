<template>
  <v-card>
    <v-card-title class="py-2 hospital-title blue lighten-1">Submit Enquiry</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-form
            ref="form"
            v-model="valid"
            class="form"
          >
            <v-row>
              <v-col class="pt-0" cols="6">
                <v-text-field
                  v-model="enquiry.subject"
                  label="Subject"
                  :rules="required"
                  required
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="pt-0" cols="6">
                <v-text-field
                  v-model="enquiry.email"
                  label="Email"
                  :rules="emailRules"
                  dense
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="enquiry.message"
              outlined
              required
              dense
              :rules="required"
              label="Message"
            ></v-textarea>
          </v-form>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        :disabled="valid ? false : true"
        color="blue darken-1" 
        text @click="saveEnquiry()"
      >Submit</v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="snackbar"
      color="green"
      top
      :timeout="3000"
    >
      <v-icon class="mr-3">mdi-check-box-multiple-outline</v-icon> Message has been sent.
    </v-snackbar>
  </v-card>
</template>
 
<script>
import axios from "../services/axios";
 
export default {
  name: "hospital-enquiry",
  props: ["hospitalId"],
  data() {
    return {
      addDialog: false,
      enquiry: {
        subject: "",
        email: "",
        message: ""
      },
      valid: false,
      required: [
        v => !!v || 'Required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      snackbar: false
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
    async saveEnquiry() {

      var data = {
        subject: this.enquiry.subject,
        email: this.enquiry.email,
        message: this.enquiry.message,
        hospital_id : this.hospitalId
      };
 
      await axios
        .post("/message", data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        this.snackbar = true;
        this.clear();
    },
    clear() {
      this.$refs.form.resetValidation();
      this.enquiry = {
        subject: "",
        email: "",
        message: ""
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