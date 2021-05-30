<template>
  <p class="display-3">Welcome, {{ auth.user.firstname }}  {{ auth.user.lastname }} ({{ auth.user.role}})</p>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  middleware: ['auth'],
  computed: {
    ...mapFields(["auth"])
  }
}
</script>

<style>

</style>