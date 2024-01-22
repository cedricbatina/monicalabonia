<template>
  <v-container>
    <h2 class="text-center">Bienvenue sur le site</h2>

    <ul v-if="articles && articles.length > 0" class="list list-group">
      <li
        v-for="(article, index) in articles"
        :key="index"
        class="list-group-item"
        :class="{ active: index == currentIndex }"
      >
        {{ article.id }} - {{ article.title }}, créee le
        <span class="dateFormat">{{
          new Date(article.createdAt).toLocaleDateString("fr-Fr", options)
        }}</span>
      </li>
    </ul>
    <v-container><p>Hi</p></v-container>
  </v-container>
</template>

<script>
import ArticleService from "../services/article.service";
export default {
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      content: "",
      user: JSON.parse(localStorage.getItem("user")),
      submitted: false,
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };
  },
  methods: {
    retrieveAllArticles() {
      ArticleService.fetchAllArticles()
        .then((response) => {
          console.log("AFTER FETCHING:", response.data);

          // Assurez-vous que response.data.articles existe
          if (response.data.articles) {
            // Si response.data.articles est déjà une référence réactive, vous pouvez l'assigner directement
            this.articles = response.data.articles;
          } else {
            // Sinon, assignez-le à une nouvelle référence réactive
            this.articles = response.data;
          }

          console.log("SHOW RESULTS:", this.articles);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  mounted() {
    this.retrieveAllArticles();
  },
};
</script>

<style>
</style>