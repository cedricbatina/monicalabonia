<template>
  <div class="container">
    <div class="card card-container">
      <h3 class="card-header">
        {{ currentUser.name }}
      </h3>
      <h4 class="card-body">{{ currentUser.id }} - {{ currentUser.email }}</h4>
      <ul class="card-body list-group">
        <li
          v-for="(role, index) in currentUser.roles"
          :key="index"
          class="list-item"
        >
          {{ role }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBoard",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
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
