<template>
  <div class="col-md-12">
    <div class="card card-container">
      <font-awesome-icon :icon="['fas', 'user']" />
      <img src="../assets//logo_monica.png" alt="log de Monica Labonia" />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <!--if registering fails-->
          <div class="form-group">
            <label for="name">Nom:</label>
            <input
              v-model="user.name"
              type="text"
              name="name"
              class="form-control"
              v-validate="'required|min:3|max:20'"
            />
            <div
              v-if="submitted && errors.has('name')"
              class="alert alert-danger"
            ></div>
          </div>
        </div>
        <!---->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="user.email"
            type="email"
            class="form-group"
            v-validate="'required|email|max:50'"
            name="email"
          />
          <div
            v-if="submitted && errors.has('email')"
            class="alert alert-danger"
          >
            {{ errors.first("password") }}
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">ENVOYER</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user.model";
export default {
  name: "SignUp",
  data() {
    return {
      user: new User("", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      (this.message = ""), (this.submitted = true);
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("/signup", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.Response && Response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
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