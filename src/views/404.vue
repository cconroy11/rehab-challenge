<template>
  <div>
    <router-back />
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center">
          <h1 class="title">
            Not Found
          </h1>
          <p class="subheading">
            The page or resource you are looking for does not exist.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import routerBack from '../components/routerBack';

export default {
  name: '404',
  components: {
    'router-back': routerBack,
  },
};
</script>

<style scoped>

</style>
