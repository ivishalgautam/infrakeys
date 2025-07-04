import { AiOutlineShop } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { TbUserQuestion } from "react-icons/tb";
import {
  LayoutDashboard,
  Tag,
  Users,
  MessageCircleQuestion,
  NotebookPen,
  IndianRupee,
  ListTodo,
  ShoppingCart,
} from "lucide-react";
import { FaIndianRupeeSign } from "react-icons/fa6";

// Define the roles for each user type
const ROLES = {
  ADMIN: "admin",
  USER: "user",
  SUB_ADMIN: "subadmin",
};

export const AllRoutes = [
  {
    label: "Dashboard",
    link: "/",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.USER, ROLES.SUB_ADMIN],
  },
  {
    label: "Products",
    link: "/products",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Products",
    link: "/products/create",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Products",
    link: "/products/[id]/edit",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Products",
    link: "/products/[id]/view",
    icon: AiOutlineShop,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Pricings",
    link: "/pricings",
    icon: FaIndianRupeeSign,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Pricings",
    link: "/pricings/create",
    icon: FaIndianRupeeSign,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Pricings",
    link: "/pricings/[id]/edit",
    icon: FaIndianRupeeSign,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/create",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/variant/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/variant/create/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/variant/edit/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/edit/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Categories",
    link: "/categories/view/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Sub categories",
    link: "/sub-categories",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Sub categories",
    link: "/sub-categories/create",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Sub categories",
    link: "/sub-categories/edit/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Sub categories",
    link: "/sub-categories/view/[id]",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Blogs",
    link: "/blogs",
    icon: NotebookPen,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Blogs",
    link: "/blogs/create",
    icon: NotebookPen,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Blogs",
    link: "/blogs/edit/[id]",
    icon: NotebookPen,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Customer points",
    link: "/points",
    icon: Tag,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Sub category types",
    link: "/sub-category-type",
    icon: BiCategoryAlt,
    roles: [ROLES.ADMIN],
  },
  // {
  //   label: "Banners",
  //   link: "/banners",
  //   icon: Image,
  //   roles: [ROLES.ADMIN],
  // },
  // {
  //   label: "Industries",
  //   link: "/industries",
  //   icon: Factory,
  //   roles: [ROLES.ADMIN],
  // },
  {
    label: "Users",
    link: "/users",
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Users",
    link: "/users/create",
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Users",
    link: "/users/[id]/edit",
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Users",
    link: "/users/[id]/view",
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Enquiries",
    link: "/enquiries",
    icon: MessageCircleQuestion,
    roles: [ROLES.ADMIN, ROLES.SUB_ADMIN],
  },
  {
    label: "Enquiries",
    link: "/enquiries/[id]",
    icon: MessageCircleQuestion,
    roles: [ROLES.ADMIN, ROLES.SUB_ADMIN],
  },
  {
    label: "Orders",
    link: "/orders",
    icon: GoChecklist,
    roles: [ROLES.ADMIN, ROLES.SUB_ADMIN],
  },
  {
    label: "Orders",
    link: "/orders/create",
    icon: GoChecklist,
    roles: [ROLES.ADMIN, ROLES.SUB_ADMIN],
  },
  {
    label: "Orders",
    link: "/orders/[id]",
    icon: GoChecklist,
    roles: [ROLES.ADMIN, ROLES.SUB_ADMIN],
  },
  {
    label: "All",
    link: "/all",
    icon: ShoppingCart,
    roles: [ROLES.USER],
  },
  {
    label: "Cart",
    link: "/cart",
    icon: ShoppingCart,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Queries",
    link: "/queries",
    icon: TbUserQuestion,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Queries",
    link: "/queries/[id]",
    icon: TbUserQuestion,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Requirements",
    link: "/requirements",
    icon: ListTodo,
    roles: [ROLES.ADMIN],
  },
  {
    label: "Credit Applies",
    link: "/credit-applies",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
  {
    label: "News",
    link: "/news",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
  {
    label: "News create",
    link: "/news/create",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
  {
    label: "News edit",
    link: "/news/edit/[id]",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
  {
    label: "News Categories",
    link: "/news-categories",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
  {
    label: "News Categories create",
    link: "/news-categories/create",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
  {
    label: "News Categories Edit",
    link: "/news-categories/[id]/edit",
    icon: IndianRupee,
    roles: [ROLES.ADMIN],
  },
];
