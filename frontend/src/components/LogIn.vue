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
              </button>
              <span>ENVOYER</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>