import axios from "axios";
import { TokenStore } from "../TokenStore.js";
import { tokenStorage } from "../tokenStorage.js";

export const BASE_URL = "https://lost-inha.kro.kr";

const api = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true, // refresh 쿠키를 쓰는 경우 필요
});

let isRefreshing = false;
let queue = []; // resolve, reject. config

const flushQueue = (error, newAccess) => {
  queue.forEach(({ resolve, reject, config }) => {
    if (error) return reject(error);
    if (newAccess) config.headers.Authorization = `Bearer ${newAccess}`;
    resolve(api(config));
  });
  queue = [];
};

api.interceptors.request.use((config) => {
  const token = TokenStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (!original || original._retry) return Promise.reject(error);
    if (error.response?.status !== 401) return Promise.reject(error);

    // 중복 재시도 방지
    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject, config: original });
      });
    }

    isRefreshing = true;
    try {
      const refreshToken = await tokenStorage.getRefreshTStorage();
      if (!refreshToken) throw new Error("NO_REFRESH");

      const { data } = await axios.post(
        `https://lost-inha.kro.kr/auth/refresh`,
        { studentId, refreshToken }
      );

      const newAccess = data.accessToken;
      const newRefresh = data.refreshToken || refreshToken;

      TokenStore.setToken(newAccess);
      await tokenStorage.saveTStorage({
        accessToken: newAccess,
        refreshToken: newRefresh,
      });

      flushQueue(null, newAccess);
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (e) {
      flushQueue(e, null);
      TokenStore.clearToken();
      await tokenStorage.clearTStorage();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
