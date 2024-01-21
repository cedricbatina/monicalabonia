<template>
  <div class="container">
    <h1>Hi welcome on this site</h1>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "WelcomePage",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPulicContent().then(
      (response) => {
        // Check if response and response.data are defined
        if (response && response.data) {
          this.content = response.data;
        } else {
          // Handle the case where response or response.data is undefined
          this.content = "No data available";
        }
      },
      (error) => {
        // Handle errors
        console.log(error);
        this.content = error.response
          ? error.response.data || "Error"
          : "Error";
      }
    );
  },
};
</script>

<style>
</style>