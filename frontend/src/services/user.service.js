import axios from "@/http.api";
import authHeader from "./auth.header";

class UserService {
  async getPulicContent() {
    try {
      console.log("Before fetching:");
      const response = await axios.get("all");
      return response.data;
    } catch (error) {
      console.log(error);
      console.error("Error while fetching public content:", error);
      throw error;
    }
  }
  async getUserBoard() {
    try {
      const response = await axios.get("user", { headers: authHeader() });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error while fetching user board:", error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  }

  async getAdminBoard() {
    try {
      const response = await axios.get("admin", { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error("Error while fetching admin board:", error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const response = await axios.get("admin", { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error("Erreur pour accéder à tous les utilisateurs");
    }
  }
}
export default new UserService();
