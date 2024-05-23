import axios from "axios";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
console.log("REACT_APP_SERVER_URL", REACT_APP_SERVER_URL);

export const instance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  withCredentials: true,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("token");
    if (token) {
      // 토큰이 있으면 Authorization 헤더에 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);
