<template>
  <div class="col-md-12">
    <div class="card card-container">
      <font-awesome-icon icon="user-plus" class="profile-img-card" />

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.email"
          :counter="10"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          label="Mot de passe"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="handleLogin">
          Validate
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OtherPage",
  data() {
    return {
      user: { email: "", password: "" },
      valid: false,
    };
  },
  computed: {
    ...mapState("authModule", ["status"]),
    loggedIn() {
      return this.status.loggedIn;
    },
  },
  created() {
    console.log(this.status.loggedIn);
    if (this.status.loggedIn) {
      this.$router.push("auth/user");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;

      // Utilisez $validator pour accéder aux erreurs de validation
      this.$validator.validate().then((isValid) => {
        if (!isValid) {
          this.loading = false;
        } else {
          if (this.user.name && this.user.password) {
            this.$store.dispatch("auth/login", this.user).then(
              () => {
                this.$router.push("/user");
              },
              (error) => {
                this.loading = false;
                this.message = error.message || error.toString();
              }
            );
          }
        }
      });
    },
  },
};
</script>

<style>
</style>
