export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    username: "/auth/username",
  },

  profile: "/users/me",
  users: { getAll: "/users" },
  products: {
    getAll: "/products",
    admin: "/products/admin/getAll",
    attribute: {
      getAll: "/product-attributes",
      term: "/product-attribute-terms",
    },
  },
  pricings: { getAll: "/products-pricing" },
  categories: {
    getAll: "/categories",
    variant: "/category-variant",
  },
  newsCategories: {
    getAll: "/news-categories",
  },
  sub_categories: {
    getAll: "/sub-categories",
  },
  sub_category_types: {
    getAll: "/sub-category-types",
  },
  banners: {
    getAll: "/banners",
  },
  blogs: {
    getAll: "/blogs",
  },
  news: {
    getAll: "/news",
  },
  brands: {
    getAll: "/brands",
  },
  points: {
    getAll: "/points",
  },
  requirements: {
    getAll: "/requirements",
  },
  industries: {
    getAll: "/industries",
  },
  files: {
    upload: "/upload/files",
    getFiles: "/upload",
  },
  cart: {
    getAll: "/carts",
    temp: "/carts/temp-cart",
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
  cart: {
    getAll: "/carts",
    temp: "/carts/temp-cart",
  },
  dashboard: {
    getAll: "/dashboard",
    stats: "/dashboard/stats",
  },
};
