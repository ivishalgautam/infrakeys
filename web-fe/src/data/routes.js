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
    roles: [],
  },
  {
    link: "/products",
    roles: [],
  },
  {
    link: "/products/[slug]",
    roles: [],
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
    link: "/apply-for-credit",
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
    link: "/blogs",
    roles: [],
  },
  {
    link: "/clientele",
    roles: [],
  },
  {
    link: "/our-partners",
    roles: [],
  },
  {
    link: "/clientele",
    roles: [],
  },
  {
    link: "/blogs/[slug]",
    roles: [],
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
