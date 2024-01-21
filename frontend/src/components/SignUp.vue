<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="nameRules"
          label="Nom"
          required
        ></v-text-field>
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
      <div class="mt-2">
        <p class="text-body-2">
          Already have an account?
          <router-link to="/login">Sign in</router-link>
        </p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import { nameRules, passwordRules, emailRules } from "@/validationRules";
export default {
  name: "SignUp",
  data() {
    return {
      user: { name: "", email: "", password: "" },
      name: nameRules,
      email: emailRules,
      password: passwordRules,
      submitted: false,
      successful: false,
      message: "",
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
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/user");
    }
  },
  methods: {
    async handleRegister() {
      this.message = "";
      this.submitted = true;

      try {
        const response = await AuthService.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Traitement réussi
        this.successful = true;
        this.message = response.data.message;

        // Rediriger l'utilisateur vers la page de connexion, par exemple
        this.$router.push("/signin");
      } catch (error) {
        // Gestion des erreurs
        this.successful = false;
        this.message =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>

<style>
</style>
