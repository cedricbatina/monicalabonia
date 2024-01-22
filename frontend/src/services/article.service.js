import http from "../http.api";

class ArticleService {
  fetchAllArticles() {
    return http.get("/api/articles");
  }
  fetchOne(id) {
    console.log(id);
    return http.get("/api/articles/${id}");
  }
  deleteArticle() {
    return http.get("/api/articles/:${id} ");
  }
  updateArticle() {
    return http.put("/api/articles/$ {id} ");
  }

  findByTitle() {
    return http.get("/api/articles?title=$ {titel} ");
  }
  deleteAllArticles() {
    return http.delete("/api/articles ");
  }
}
export default new ArticleService();
