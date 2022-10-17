import axios from "axios";

// const DOMAIN = "https://www.youtube.com";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

const apiClient = axios.create({
    // baseURL: DOMAIN   // 환경변수로 지정한 BASE_URL을 사용
    // baseURL: DOMAIN,
    headers: {
      'Content-Type': 'application/json',
    },
});

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };


// export const request = (method:string, url:string, data?:object) => {
//     return axios({
//         method,
//         url: DOMAIN + url,
//         data,
//     })
//     .then((res) => alert(res.data))
//     .catch((err) => console.log(err));
// };