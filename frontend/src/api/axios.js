import axios from "axios";
import {getItemWithExpireTime, removeItem, setItemWithExpireTime} from "../service/localStorage"
// const DOMAIN = "https://www.youtube.com";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

class API_CLIENT {
  constructor() {
    this.client = axios.create({
      // baseURL: "http://43.201.114.181:8000",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  setProfile() {
    if(getItemWithExpireTime("user")) {
      console.log(getItemWithExpireTime("user"));
      let uid = getItemWithExpireTime("user").id;
      let token = getItemWithExpireTime("user").access;

      this.client = axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        },
      });
    }
  }

  async get(url) {
    this.setProfile();
    console.log(url);
    const result = await this.client.get(url);
    this.auth(result.status);
    return result;
  }

  async post(url, data) {
    this.setProfile();
    const result = await this.client.post(url, data);
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