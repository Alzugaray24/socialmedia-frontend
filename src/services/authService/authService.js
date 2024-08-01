const API_URL = "http://localhost:8080/api/";

class AuthService {
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        console.log("aqui");
        throw new Error(`${responseBody.message}`);
      }

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      console.log("Registering user with data:", userData); // Para depuración

      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(`${responseBody.message}`);
      }

      return responseBody;
    } catch (error) {
      console.error("Error registering:", error);
      throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
    }
  }
}

export default new AuthService();
