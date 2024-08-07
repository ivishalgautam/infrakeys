"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MainContext } from "@/store/context";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import {
  Box,
  Handshake,
  HeartHandshake,
  Home,
  Info,
  Menu,
  SquarePen,
  SquareUserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

const size = 20;

export const navList = [
  { title: "Home", href: "/", icon: <Home size={size} />, isHide: false },
  { title: "About", href: "/about", icon: <Info size={size} />, isHide: false },
  {
    title: "Products",
    href: "/products",
    icon: <Box size={size} />,
    isHide: false,
  },
  {
    title: "Blogs",
    href: "/blogs",
    icon: <SquarePen size={size} />,
    isHide: false,
  },
  {
    title: "Clientele",
    href: "/clientele",
    icon: <Handshake size={size} />,
    isHide: true,
  },
  {
    title: "Partners",
    href: "/our-partners",
    icon: <HeartHandshake size={size} />,
    isHide: true,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <SquareUserRound size={size} />,
    isHide: false,
  },
];

const fetchTempCart = async () => {
  const { data } = await http().get(endpoints.cart.getAll);
  return data;
};

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 bg-white shadow-sm">
      <HeaderTop />
    </header>
  );
}

export const HeaderTop = () => {
  const pathname = usePathname();
  const { user, isUserLoading } = useContext(MainContext);
  const { data } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart-items", pathname],
    enabled: !!user,
  });

  return (
    <div className="container block">
      <Sheet>
        <div className="flex items-center justify-between py-2">
          <div className="">
            <Link href={"/"}>
              <Image
                width={128}
                height={60}
                src={"/logo.webp"}
                alt="logo"
                className="h-full w-full object-contain object-center"
              />
            </Link>
          </div>

          <nav className="ml-auto mr-10 hidden lg:block">
            <ul className="flex items-center justify-start gap-2">
              {user && (
                <Link
                  href={"/profile/enquiries?status=pending_enquiry"}
                  className={cn(
                    `flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200`,
                    {
                      "bg-primary text-white hover:bg-primary":
                        pathname.includes("profile"),
                    },
                  )}
                >
                  <span>
                    <FiUser size={size} />
                  </span>
                  <span>Dashboard</span>
                </Link>
              )}
              {navList.map(
                ({ title, href, icon, isHide }) =>
                  !isHide && (
                    <li key={title}>
                      <Link
                        href={href}
                        className={cn(
                          `flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200`,
                          {
                            "bg-primary text-white hover:bg-primary":
                              pathname === href,
                          },
                        )}
                      >
                        <span>{icon}</span>
                        <span>{title}</span>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center justify-center gap-4 lg:ml-0">
            {isUserLoading ? (
              <ProfileLoading />
            ) : user ? (
              <>
                <Link href={"/cart"} className="relative">
                  {data?.length ? (
                    <span className="absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                      {data?.length}
                    </span>
                  ) : (
                    <></>
                  )}
                  <MdOutlineShoppingCart size={25} />
                </Link>
                <Link href={"/profile/enquiries?status=pending_enquiry"}>
                  <FiUser size={25} />
                </Link>{" "}
              </>
            ) : (
              <Link href={"/auth/login"} className={buttonVariants("primary")}>
                Login
              </Link>
            )}
          </div>

          <SheetTrigger asChild className="ml-2 block lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="flex items-center justify-center"
            >
              <Menu />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>
            <Link href={"/"}>
              <Image
                width={150}
                height={150}
                src={"/logo.webp"}
                alt="logo"
                className="object-contain object-center"
              />
            </Link>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <ul className="space-y-2">
              {user && (
                <Link
                  href={"/profile/enquiries?status=pending_enquiry"}
                  className={cn(
                    `flex items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200`,
                    {
                      "bg-primary text-white hover:bg-primary":
                        pathname.includes("profile"),
                    },
                  )}
                >
                  <span>
                    <FiUser size={size} />
                  </span>
                  <span>Dashboard</span>
                </Link>
              )}
              {navList.map(
                ({ href, icon, title, isHide }) =>
                  !isHide && (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          `flex items-center justify-start gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-gray-200`,
                          {
                            "bg-primary text-white hover:bg-primary":
                              pathname === href,
                          },
                        )}
                      >
                        <span>{icon}</span>
                        <span>{title}</span>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export function ProfileLoading() {
  return (
    <div className="h-10 w-16 animate-pulse rounded-md bg-gray-500/20"></div>
  );
}

// export const HeaderTop = ({ user }) => {
//   return (
//     <div className="hidden bg-secondary py-2.5 md:block">
//       <div className="container flex items-center justify-between text-sm font-medium text-white">
//         <div className="flex items-center justify-center gap-2">
//           <FaPhone />
//           <span>+91 9811632400</span>
//         </div>
//         <Link href={user ? "/customer/profile" : "/login"}>
//           {user ? `${user?.first_name} ${user?.last_name}` : "Log In / Sign Up"}
//         </Link>
//       </div>
//     </div>
//   );
// };
