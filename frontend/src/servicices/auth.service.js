import axios from "axios";
import API_URL from "@/http.api";

class AuthService {
  async login(user) {
    const Response = await axios.post(API_URL + "signin", {
      email: user.email,
      password: user.password,
    });
    if (Response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(Response.data));
    }
    return Response.data;
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return axios.post(API_URL + "signup", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
