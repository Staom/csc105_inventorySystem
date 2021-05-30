<template>
  <v-app>
    <v-main>
      <v-container fill-height class="justify-center">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style scoped>
</style>
