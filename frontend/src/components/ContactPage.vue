<template>
  <div class="col-md-12">
    <div class="card card-container">
      <font-awesome-icon icon="user-plus" class="profile-img-card" />

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          label="Mot de Passe"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="handleLogin">
          Login
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import User from "../models/user.model";
import { mapState } from "vuex";
import { emailRules, passwordRules } from "../validationRules.js";
export default {
  name: "ContactPage",
  data() {
    return {
      user: new User("", ""),
      valid: false,
      passwordRules: [
        (value) => !!value || "Entrez un mot de passe",
        (value) =>
          value.length >= 6 ||
          "Le mot de passe doit contenir au moins 6 caractères",
        (value) =>
          /[A-Z]/.test(value) ||
          "Le mot de passe doit contenir au moins une lettre majuscule",
        (value) =>
          /[!@#$%^&*(),.?":{}|<>0-9]/.test(value) ||
          "Le mot de passe doit contenir au moins un caractère spécial",
        (value) =>
          /\d/.test(value) ||
          "Le mot de passe doit contenir au moins un chiffre",
      ],
      emailRules: [
        (value) => !!value || " Entrez un E-mail",
        (value) => /^\S+@\S+\.\S+$/.test(value) || "Entrez un E-mail valide",
      ],
      password: passwordRules,
      email: emailRules,
    };
  },
  computed: {
    ...mapState("authModule", ["status"]),
    loggedIn() {
      return this.status.loggedIn;
    },
  },
  created() {
    if (this.status.loggedIn) {
      console.log(this.loggedIn);
      this.$router.push("/user");
    }
  },
  methods: {
    async handleLogin() {
      // Validation using Vuetify rules
      const valid = await this.$refs.form.validate();
      console.log("After validate:", valid);

      if (valid) {
        // Perform login action
        try {
          await this.$store.dispatch("authModule/login", this.user);
          console.log("Redirecting to /user");
          this.$router.push("/user");
        } catch (error) {
          // Handle login error
          console.error("Login failed:", error);
        }
      }
    },
  },
};
</script>

<style>
</style>
