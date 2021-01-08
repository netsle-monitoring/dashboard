import { stringify } from "querystring";

const URI = "http://localhost:8000/";

export default class ApiService {
  static getAuthorizationHeader() {
    return {
      "Authorization": `Bearer ${this.getAccessToken()}`
    }  
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  static async login(username, password) {
    try {
      let response = await this.post(
        "login",
        stringify({ username, password }),
        {"content-type": "application/x-www-form-urlencoded"}
      );

      return response;
    } catch (e) {
      throw e;
    }
  }

  static async refresh() {
    try {
      let response = await this.post(
        "refresh_token", {}, {
          "Refresh-Token": `${this.getRefreshToken()}`
        }
      );

      return response;
    } catch (e) {
      throw e;
    }
  }

  static async getDashboardPacketGraph() {
    try {
      let response = await this.get("dashboard/packet_count_graph", this.getAuthorizationHeader());
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async getDashboardTotalPackets() {
    try {
      let response = await this.get("dashboard/total_packets", this.getAuthorizationHeader());
      return response;
    } catch (e) {
      throw e;
    }
  }
  // Returns the body / error
  static async get(path, headers = {}) {
    try {
      let body = await fetch(URI + path, {
        method: "GET",
        headers
      });

      let json = await body.json();

      if (body.status !== 200) {
        throw {code: body.status, message: json.message};
      }
      
      return json;
    } catch (e) {
      if (e?.code === 401) {
        // TODO: Start token refreshment, and reset the request.
        console.log("TOKEN EXPIRED OMG OMG OMG");
      }
      throw e;
    }
  }

  static async post(path, body, headers = {}) {
    try {
      let res = await fetch(URI + path, {
        method: "POST",
        body,
        headers
      });
      let json = await res.json();
      if (res.status !== 200) {
        throw json;
      }

      return json;
    } catch (e) {
      throw e;
    }
  }
}
