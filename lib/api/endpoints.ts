export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    PROFILE: "/api/auth/profile",

    // ✅ MOVE THESE INSIDE AUTH
    REQUEST_PASSWORD_RESET: "/api/auth/request-password-reset",
    RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
  },

  ADMIN: {
    USERS: "/api/admin/users",
  },

  PRODUCTS: {
    GET_ALL: "/api/products",
  },
};
