<template>
  <div id="app" class="container-fluid">
    <nav class="navbar col-sm-12 navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand col-md-4 mr-3" href="#"
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
        <div><span class="m3 col-md-2"></span></div>
        <div
          class="collapse col-md-6 ml-3 navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-link">
              <router-link
                to="/accueil"
                class="nav-link nav-link active"
                aria-current="page"
              >
                <font-awesome-icon icone="home" /> Accueil
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/les-publications" class="nav-link"
                >Publications</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
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
                Politiques et confidentialités
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="nav-item">
                  <router-view class="nav-link">Mentions Legales</router-view>
                </li>
                <li v-if="currentUser" class="nav-item"></li>
                <li v-if="showAdminBoad">
                  <router-link to="admin" class="nav-item dropdown-item"
                    >Administration</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
                >Disabled</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <p>Mboté</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
