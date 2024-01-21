import axios from "../http.api";

class AuthService {
  async login(user) {
    try {
      const response = await axios.post("/api/signin", {
        email: user.email,
        password: user.password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // Handle login error
      console.log("SHOW ME WHERE THE ERROR OCCURS", error);
      console.error("Login failed:", error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post("/api/signup", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
