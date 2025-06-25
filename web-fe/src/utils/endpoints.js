export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    username: "/auth/username",
    verifyOtp: "/auth/verify",
  },

  profile: "/users/me",
  users: { getAll: "/users" },
  products: {
    getAll: "/products",
    pricing: "/products-pricing",
    admin: "/products/admin/getAll",
    attribute: {
      getAll: "/product-attributes",
      term: "/product-attribute-terms",
    },
  },
  categories: {
    getAll: "/categories",
  },
  subCategories: {
    getAll: "/sub-categories",
  },
  brands: {
    getAll: "/",
  },
  points: {
    getAll: "/points",
  },
  requirements: {
    getAll: "/requirements",
  },
  banners: {
    getAll: "/banners",
  },
  brands: {
    getAll: "/brands",
  },
  blogs: {
    getAll: "/blogs",
  },
  news: {
    getAll: "/news",
    categories: "/news-categories",
  },
  files: {
    upload: "/upload/files",
    getFiles: "/upload",
  },
  cart: {
    getAll: "/carts",
  },
  orders: {
    getAll: "/orders",
  },
  enquiries: {
    getAll: "/enquiries",
  },
  queries: {
    getAll: "/queries",
  },
  creditApplies: {
    getAll: "/credit-applies",
  },
  otp: {
    send: "/auth/send",
    verify: "/auth/verify",
  },
};
