<template>
  <v-card
    class="pa-5 information-box"
    elevation="0"
    color="#efefef"
  >
    <v-card-title class="py-2 pl-0 hospital-title">{{ hospital.name }}</v-card-title>
    <v-card-text class="py-4 pl-0 hospital-body">
      <div class="item mb-3"><v-icon left>mdi-phone</v-icon>{{ formattedPhoneNumber }}</div>
      <div class="item"><v-icon left>mdi-map-marker</v-icon>
        {{ hospital.address }} <br>
        {{ hospital.city }}, {{ hospital.state }} {{ hospital.zip }}
      </div>
    </v-card-text>
  </v-card>
</template>
 
<script>

export default {
  name: "hospital-detail",
  props: ["hospital"],
  computed: {
    formattedPhoneNumber() {
      var number = this.hospital.phone_number;
      return number.toString().replace(/(\d{3})(\d{3})(\d{4})/,"($1)$2-$3");
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .hospital-title {
    font-size: 40px;
    font-weight: 700;
    font-family: 'Oxygen', sans-serif;
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
  .information-box {
    border-bottom: solid 3px #999 !important;
  }
</style>