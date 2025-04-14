"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AllRoutes } from "@/data/sidebarData";
import { MainContext } from "@/store/context";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logout } from ".";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useContext(MainContext);

  const userRole = user?.role;

  let filteredMenu = AllRoutes?.filter(
    (item) =>
      !item.link.includes("/edit") &&
      !item.link.includes("/create") &&
      !item.link.includes("[id]") &&
      !item.link.includes("cart")
  );

  // Determine the appropriate sidebar data based on the user's role
  let sidebarData = filteredMenu.filter((route) => {
    return route.roles.includes(userRole);
  });

  const renderIcon = (IconComponent) => {
    if (IconComponent) {
      return <IconComponent size={20} />;
    }
    return null;
  };

  const isLinkActive = (link) => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname === link;
  };

  return (
    <div className="w-80 h-full overflow-y-auto bg-gray-950 text-slate-200">
      <ul className="p-4 pb-28 font-mulish font-bold text-base space-y-2">
        {sidebarData?.map((item) => (
          <li key={item.label}>
            <Link href={item.link}>
              <p
                className={`px-4 py-2 ${
                  isLinkActive(item.link)
                    ? "bg-primary text-white"
                    : "bg-transparent"
                } hover:bg-primary hover:text-white rounded-md cursor-pointer flex items-center justify-start gap-2`}
              >
                <span>{renderIcon(item.icon)}</span>
                <span className="text-sm font-normal">{item.label}</span>
              </p>
            </Link>
          </li>
        ))}

        <li>
          <Button
            variant="primary"
            className="w-full space-x-4"
            onClick={() => logout()}
          >
            <span>Logout</span>
            <span>
              <LogOut size={15} />
            </span>
          </Button>
        </li>
      </ul>
    </div>
  );
}
