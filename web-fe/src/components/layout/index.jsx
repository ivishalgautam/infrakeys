"use client";
import React, { useContext, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams, usePathname, useRouter } from "next/navigation";
import { allRoutes } from "@/data/routes";
import { MainContext } from "@/store/context";
import Spinner from "../Spinner";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams();
  const { user, isUserLoading } = useContext(MainContext);

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/verify"
    ) {
      return;
    }

    if (isUserLoading) return;
    // Find the current route in the AllRoutes array
    const currentRoute = allRoutes?.find(
      (route) => route.link === pathname.replace(slug, "[slug]"),
    );
    // const currentRoute = allRoutes?.find((route) => route.link === pathname);
    // if (!currentRoute) {
    //   return router.replace("/");
    // }

    if (user && currentRoute?.roles?.length && !user?.is_verified) {
      return router.push("/verify");
    }

    // If the current route is not found in the array or the user's role is not allowed for this route
    if (
      currentRoute &&
      currentRoute?.roles?.length &&
      !currentRoute?.roles?.includes(user?.role)
    ) {
      localStorage.clear();
      router.replace("/login");
    }
  }, [pathname, user, isUserLoading, slug]);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <div className="h-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
