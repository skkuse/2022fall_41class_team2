import axios from "axios";
import {removeItem} from "../service/localStorage"
// const DOMAIN = "https://www.youtube.com";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

class API_CLIENT {
  constructor() {
    this.apiClient = axios.create({
      // baseURL: DOMAIN,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get(url) {
    this.apiClient.get(url).then((val) => {
      this.auth(val.status);
    })
  }

  post(url, data) {
    this.apiClient.post(url, data).then((val) => {
      this.auth(val.status);
    })
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

export const apiClient = API_CLIENT();