<template>
  <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

    </v-app-bar>
</template>

<script>
export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
            {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
            },
            {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire'
            }
        ],
        miniVariant: false,
        title: 'Inventory System'
      }
    }
}
</script>

<style>

</style>