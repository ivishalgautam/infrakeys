"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { RxCross2 } from "react-icons/rx";
import BrowseCategory from "./browse-category";
import Search from "./Search";
import { navList } from "./Navbar";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { MainContext } from "@/store/context";

export default function MobileNavigation({ setMobileNavActive }) {
  const { user } = useContext(MainContext);
  return (
    <div className="shadow-md">
      <div className="h-screen w-[25rem] max-w-full md:hidden">
        <div className="flex items-center justify-between bg-white p-4">
          <Image width={100} height={100} src={"/logo.png"} alt="logo" />
          <Button
            size="icon"
            className="bg-transparent text-black hover:bg-black/10"
            onClick={() => setMobileNavActive(false)}
          >
            <RxCross2 size={30} />
          </Button>
        </div>
        <div className="h-full divide-y-2 divide-primary-foreground bg-primary p-4">
          <div className="py-6">
            <Search />
          </div>
          <div className="py-6">
            <BrowseCategory />
          </div>
          <nav>
            <ul className="flex flex-col items-start justify-center divide-y-2 divide-primary-foreground">
              {navList.map(({ title, href }) => (
                <li className="w-full py-4" key={title}>
                  <Link
                    href={href}
                    className="h-full w-full text-sm font-semibold text-white"
                    onClick={() => setMobileNavActive(false)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="py-6 text-sm font-medium text-white">
            <Link
              onClick={() => setMobileNavActive(false)}
              href={user ? "/customer/overview" : "/login"}
            >
              {user
                ? `${user?.first_name} ${user?.last_name}`
                : "Log In / Sign Up"}
            </Link>
            <div className="mt-4 flex items-center justify-start gap-2">
              <FaPhone />
              <span>+91 9811632400</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
