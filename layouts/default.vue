<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      </v-app-bar>
      <v-list>
        <template v-for="(item, i) in items">
          <v-list-item :key="i" :to="item.to" router exact>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-action v-bind="attrs" v-on="on">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-item>
        </template>
       
      </v-list>
      <template v-slot:append>
          <v-list-item router exact @click="logout">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-action v-bind="attrs" v-on="on">
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="`Logout`" />
                </v-list-item-content>
              </template>
              <span>Logout</span>
            </v-tooltip>
          </v-list-item>
        </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed flat app>
      <v-toolbar-title v-text="title" class="headline font-weight-bold" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      miniVariant: true,
      title: "Inventory System",
    };
  },
  computed: {
    ...mapFields(["auth"]),
    items() {
      return [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-package",
          title: "Stock",
          to: "/stocksmgmt",
        },
        ...(this.auth.user.role === "admin"
          ? [
              {
                icon: "mdi-account",
                title: "User",
                to: "/usersmgmt",
              },
            ]
          : []),
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ];
    },
  },
  methods: {
    logout() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "Do you want to logout!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, let's log out!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push(`/login`);
          }
        });
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style scoped>
</style>
