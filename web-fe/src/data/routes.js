const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const allRoutes = [
  {
    link: "/",
    roles: [],
  },
  {
    link: "/about",
    roles: [ROLES.USER],
  },
  {
    link: "/products",
    roles: [ROLES.USER],
  },
  {
    link: "/products/[slug]",
    roles: [ROLES.USER],
  },
  {
    link: "/cart",
    roles: [ROLES.USER],
  },
  {
    link: "/customer",
    roles: [ROLES.USER],
  },
  {
    link: "/customer/[slug]",
    roles: [ROLES.USER],
  },
  {
    link: "/categories/[slug]",
    roles: [ROLES.USER],
  },
  {
    link: "/categories/[slug]/[subCatSlug]",
    roles: [ROLES.USER],
  },
  {
    link: "/brands/[slug]",
    roles: [ROLES.USER],
  },
  {
    link: "/orders",
    roles: [ROLES.USER],
  },
  {
    link: "/orders/[slug]",
    roles: [ROLES.USER],
  },
  {
    link: "/enquiries/[slug]/details",
    roles: [ROLES.USER],
  },
  {
    link: "/orders/[slug]/details",
    roles: [ROLES.USER],
  },
  {
    link: "/verify",
    roles: [ROLES.USER],
  },
  {
    link: "/profile/enquiries",
    roles: [ROLES.USER],
  },
  {
    link: "/profile/orders",
    roles: [ROLES.USER],
  },
  {
    link: "/profile/details",
    roles: [ROLES.USER],
  },
  {
    link: "/verify",
    roles: [ROLES.USER],
  },
  {
    link: "/verify",
    roles: [ROLES.USER],
  },
];
