<template>
  <!--
  <v-layout row wrap justify="center" align="center">
    <v-flex md4>
    -->
      <v-card>
      <v-card-text>
        <p class="display-4">Login to Inventory system</p>
        <v-text-field v-model="username" label="Username" @keypress.enter="handleLoginClicked()" autofocus></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          @keypress.enter="handleLoginClicked()"
        ></v-text-field>
       
        </v-card-text>
        <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn @click="handleLoginClicked()" large color="success" class="mr-4"> Login </v-btn>
        </v-card-actions>
      </v-card>
      <!--
    </v-flex>
  </v-layout>
  -->
</template>

<script>
import qs from 'qs';
import { mapFields } from 'vuex-map-fields';


export default {
  layout: "session",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapFields(["auth","header"])
  },
  methods: {
    async handleLoginClicked() {
      try {
        let { data } = await this.$axios.post(`/authen/login?${qs.stringify({ username: this.username , password: this.password})}`)
        if(!data.error){
          this.auth.token = data.token;
          this.auth.user = data.user;
          this.auth.isLoggedIn = true;
          this.header = "success!";
          this.$swal(data.title, data.message, "success").then(() => this.$router.push(`/dashboard`));
        }else{
          this.$swal(data.title, data.message, "error");
        }

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created(){
    this.header = "Login page";
    this.auth.isLoggedIn = false;
    this.auth.user = {
        "username": "",
        "role": "",
        "firstname": "",
        "lastname": "",
        "birthdate": "",
        "gender": "",
        "email": "",
        "tel": "",
        "status": "",
    };
    this.auth.token = "";
    localStorage.clear();
  }
};
</script>

<style>
</style>