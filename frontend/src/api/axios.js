import axios from "axios";
import {removeItem, setItemWithExpireTime} from "../service/localStorage"
// const DOMAIN = "https://www.youtube.com";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

class API_CLIENT {
  constructor() {
    this.apiClient = axios.create({
      // baseURL: "http://43.201.114.181:8000",
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }

  async get(url) {
    const result = await this.apiClient.get(url);
    this.auth(result.status);
    return result;
  }

  async post(url, data) {
    const result = await this.apiClient.post(url, data);
    this.auth(result.status);
    return result;

  }

  auth(status) {
    switch (status) {
      case 403:
        removeItem("user");
        break;
    
      default:
        setItemWithExpireTime("user",true,1000*60*60);
        break;
    }
  }
}

export const apiClient = new API_CLIENT();