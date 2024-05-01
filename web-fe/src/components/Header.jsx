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
import { buttonVariants } from "./ui/button";
import Spinner from "./Spinner";
import { Box, Home, Info, SquareUserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const size = 20;

export const navList = [
  { title: "Home", href: "/", icon: <Home size={size} /> },
  { title: "About", href: "/about", icon: <Info size={size} /> },
  { title: "Products", href: "/products", icon: <Box size={size} /> },
  { title: "Contact", href: "/contact", icon: <SquareUserRound size={size} /> },
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
      <div className="flex items-center justify-between py-2">
        <div className="">
          <Link href={"/"}>
            <Image
              width={70}
              height={70}
              src={"/logo.webp"}
              alt="logo"
              className="h-full w-full object-contain object-center"
            />
          </Link>
        </div>

        <nav className="ml-auto mr-10 hidden md:block">
          <ul className="flex items-center justify-start gap-2">
            {navList.map(({ title, href, icon }) => (
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
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-center gap-4">
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
      </div>
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
