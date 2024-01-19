import axios from "axios";
import API_URL from "@/http.api";
import authHeader from "./auth.header";

class UserService {
  getPulicContent() {
    return axios.get(API_URL + "all");
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}
export default new UserService();
