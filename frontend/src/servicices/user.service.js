import axios from "axios";
import API_URL from "@/http.api";
import authHeader from "./auth.header";

class UserService {
  getPulicContent() {
    return axios
      .get(API_URL + "all")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching public content:", error);
        throw error;
      });
  }
  getUserBoard() {
    return axios
      .get(API_URL + "user", { headers: authHeader() })
      .then((response) => response.data)
      .catch((error) => {
        // Handle error
        console.error("Error while fetching user board:", error);
        throw error; // Re-throw the error to be caught by the calling function
      });
  }

  getAdminBoard() {
    return axios
      .get(API_URL + "admin", { headers: authHeader() })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching admin board:", error);
        throw error;
      });
  }
}
export default new UserService();
