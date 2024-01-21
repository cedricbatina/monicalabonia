<template>
  <div class="col-md-12">
    <div class="card card-container">
      <font-awesome-icon icon="user-plus" class="profile-img-card" />

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <!-- 
            <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>
        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>-->

        <v-btn :disabled="!valid" color="success" @click="validate">
          Validate
        </v-btn>

        <v-btn color="error" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Name"
        ></v-text-field>

        <v-text-field
          v-model="phone.value.value"
          :counter="7"
          :error-messages="phone.errorMessage.value"
          label="Phone Number"
        ></v-text-field>

        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
        ></v-text-field>

        <v-select
          v-model="select.value.value"
          :items="items"
          :error-messages="select.errorMessage.value"
          label="Select"
        ></v-select>

        <v-checkbox
          v-model="checkbox.value.value"
          :error-messages="checkbox.errorMessage.value"
          value="1"
          label="Option"
          type="checkbox"
        ></v-checkbox>

        <v-btn class="me-4" type="submit"> submit </v-btn>

        <v-btn @click="handleReset"> clear </v-btn>
      </form>
      <Form
        :validation-schema="schema"
        action=""
        name="form"
        @submit="handleLogin"
      >
        <div class="form-group">
          <Field
            name="email"
            type="email"
            v-model="user.name"
            :rules="validateEmail"
          />
          <ErrorMessage name="email" />
        </div>

        <Field name="password" type="password" v-model="user.password" />
        <ErrorMessage name="password" />

        <div class="form-group">
          <button class="btn btn-block btn-primary" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>ENVOYER</span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import User from "../models/user.model";
import { mapState } from "vuex";

export default {
  name: "LogIn",
  data() {
    return {
      user: new User("", ""),
      loading: false,
    };
  },
  rules: {},
  validations: {},
  nombre: {},
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
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }
      // All is good
      return true;
    },
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
  components: { Form, Field, ErrorMessage },
};
</script>

<style>
</style>