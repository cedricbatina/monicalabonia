<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        src="../assets/logo_monica_mini.png"
        alt="logo de Monica Labonia"
        class="profile-img-card"
      />
      <form action="" name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="name">Nom:</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="user.name"
            v-validate="required"
            class="form-control"
          />
          <div
            v-if="errors.has('name')"
            class="alert alert-danger"
            role="alert"
          >
            <span>Nom valide obligatoire</span>
          </div>
          <div class="form-group">
            <label for="password" name="password">Mot de passe</label>
            <input
              type="password "
              v-validate="required"
              id="password"
              name="password"
              class="form-control"
            />
            <div v-if="errors.has(password)" class="alert alert-danger">
              <span>Mot de passe valide obligatoire</span>
            </div>
            <div class="form-group">
              <button class="btn btn-block btn-primary" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>ENVOYER</span>
              </button>
            </div>
            <div v-if="message" class="alert alert-danger" role="alert">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user.model";

export default {
  name: "LogIn",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.name && this.user.password) {
          this.$store.dispatch("/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                error.Response.data || error.message || error.toStrings();
            }
          );
        }
      });
    },
  },
};
</script>

<style>
</style>