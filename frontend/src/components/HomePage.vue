<template>
  <div class="container">
    <h3 class="card-header mb-4">Bienvenue sur mon site</h3>
    <img src="../assets/logo_monica.png" alt="" />
  </div>
</template>

<script>
import UserService from "@/servicices/user.service";

export default {
  name: "HomePage",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPulicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content = error.response.data || error.message || error.toString();
      }
    );
  },
};
</script>

<style>
</style>