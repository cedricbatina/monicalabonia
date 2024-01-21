<template>
  <div id="app" class="container-fluid">
    <nav class="navbar col-sm-12 navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand col-md-6 mr-4" href="#"
          ><img src="./assets/logo_monica.png" alt=""
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse col-md-6 ml-3 navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link nav-link active"
                aria-current="page"
              >
                <font-awesome-icon icon="home" /> Accueil
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/les-publications" class="nav-link">
                <font-awesome-icon icon="archive" />
                Publications</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">
                <font-awesome-icon icon="contact-card"></font-awesome-icon>
                Contact</router-link
              >
            </li>

            <li class="nav-item">
              <router-link to="/mentions-legales" class="nav-link">
                <font-awesome-icon icon="scale-balanced"></font-awesome-icon>
                Mentions</router-link
              >
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <font-awesome-icon icon="lock" />
                Admin
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="nav-item">
                  <router-link to="/login" class="nav-link">
                    <font-awesome-icon icon="user" />
                    <font-awesome-icon icon="sign-in-alt" /> Log In</router-link
                  >
                </li>
                <li v-if="currentUser" class="nav-item"></li>
                <li v-if="showAdminBoard">
                  <router-link to="/admin" class="nav-item dropdown-item"
                    >Administration</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li class="nav-item">
                  <router-link to="/divers" class="nav-link">
                    <font-awesome-icon icon="archive" />
                    Divers</router-link
                  >
                </li>
              </ul>
            </li>
            <!--       <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
                >Disabled</a
              >
            </li>-->
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <h2 class="text-center siteTitre">
        Anthropologie politique et religieuse
      </h2>
    </div>
    <div class="container-fluid card"></div>

    <div>
      <!-- Ajout de router-view pour afficher le contenu des pages -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.authModule.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_UI");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #2c3e50;
  /*margin-top: 60px;*/
}
.nav-ling {
  margin: 3px;
}
.siteTitre {
  font-size: larger;
}
</style>
