<template>
  <v-container>
    <p>Tous les utilisateurs</p>
    <p v-for="user in users" :key="user.id">
      {{ user.name }} - {{ user.email }}
    </p>
  </v-container>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      UserService.getAdminBoard()
        .then((response) => {
          this.users = response.data.users;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
