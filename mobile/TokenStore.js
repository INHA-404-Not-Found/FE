let accessToken = null;

export const TokenStore = {
  setToken: (token) => {
    accessToken = token;
  },
  getToken: () => {
    return accessToken;
  },
  clearToken: () => {
    accessToken = null;
  },
};
