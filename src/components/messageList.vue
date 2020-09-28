<template>
  <v-dialog v-model="messageDialog" scrollable persistent max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon href v-bind="attrs" v-on="on">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-message-text-outline</v-icon>
          </template>
          <span>View Messages</span>
        </v-tooltip>
      </v-btn>
    </template>
    <v-card flat tile>
      <v-card-title class="py-4 hospital-title blue darken-1">Messages</v-card-title>
      <v-card-text>
        <v-list three-line max-height="400px">
          <template v-for="(message, i) in messages">
            <v-dialog :key="i" max-width="700px">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  class="message-item"
                  v-bind="attrs" 
                  v-on="on"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-icon>mdi-email-multiple</v-icon>
                  </v-list-item-avatar>
        
                  <v-list-item-content>
                    <v-list-item-title>{{message.subject}} | {{message.email}}</v-list-item-title>
                    <v-list-item-subtitle v-html="message.message"></v-list-item-subtitle>
                  </v-list-item-content>

                </v-list-item>
              </template>
              <v-card
                class="mx-auto"
              >
                <v-toolbar color="primary" dark>
                  <v-toolbar-title>{{message.subject}}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-icon small class="mr-2">mdi-email</v-icon>{{ message.email }}
                </v-toolbar>

                <v-divider class="mx-4 mb-4"></v-divider>

                <v-card-text>
                  <div>{{message.message}}</div>
                </v-card-text>
            
                <v-divider class="mx-4"></v-divider>
            
                
              </v-card>
            </v-dialog>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="messageDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
<script>
import axios from "../services/axios";
 
export default {
  name: "view-messages",
  data() {
    return {
      messageDialog: false,
      messages: []
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    async getMessages() {
 
      await axios
        axios
          .get('/messages')
          .then(response => {
            this.messages = response.data; // JSON are parsed automatically.
          })
          .catch(e => {
            console.log(e);
          });
    },
  }
    
};
</script>
 
<style scoped>
.hospital-title {
  font-family: 'Oxygen', sans-serif;
  color: #fff;
  font-size: 30px !important;
  font-weight: 700 !important;
}
.message-item.v-list-item {
    border-bottom: solid #efefef 2px;
}
</style>