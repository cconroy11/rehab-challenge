<template>
  <v-row v-if="currentRouteName.path != '/'">
    <v-btn class="ml-5 mt-4 btn-back" text small @click="goBack()">
      <v-icon left>mdi-arrow-left</v-icon>Back
    </v-btn>
  </v-row>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$router.currentRoute;
    } 
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.btn-back {
  color: #555;
}
.v-icon.v-icon {
  font-size: 18px;
}
</style>