import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { CiLogout } from "react-icons/ci";
import { IoBagHandleOutline, IoCartOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "../Spinner";
import { MainContext } from "@/store/context";
import { cn } from "@/lib/utils";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const { user } = useContext(MainContext);
  if (!user) return <Spinner />;

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="rounded-md bg-white p-4">
              <Sidebar {...user} pathname={pathname} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <div className="rounded-md bg-white p-4">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sidebar({ pathname }) {
  const router = useRouter();

  const tabs = [
    {
      title: "Enquiries",
      href: "enquiries",
      icon: <IoCartOutline size={18} />,
    },
    {
      title: "Orders",
      href: "orders",
      icon: <IoCartOutline size={18} />,
    },
    {
      title: "Details",
      href: "details",
      icon: <LiaUserEditSolid size={18} />,
    },
  ];

  return (
    <div className="">
      <ul className="divide-y overflow-hidden rounded border">
        {tabs.map(({ title, href, icon }) => (
          <li
            key={href}
            className={cn("text-sm hover:bg-primary hover:text-white", {
              "bg-primary text-white": pathname.includes(href),
            })}
          >
            <Link
              className="flex items-center justify-start gap-4 p-4"
              href={`/profile/${href}${href === "enquiries" ? "?status=pending_enquiry" : href === "orders" ? "?status=pending_orders" : ""}`}
            >
              <div>{icon}</div>
              <div>{title}</div>
            </Link>
          </li>
        ))}
        <li className="text-sm">
          <Button
            onClick={() => {
              localStorage.clear();
              router.replace("/login");
            }}
            className="flex w-full items-center justify-start gap-4 rounded-none bg-transparent px-4 py-6 text-sm text-black hover:bg-transparent"
          >
            <CiLogout />
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
}
