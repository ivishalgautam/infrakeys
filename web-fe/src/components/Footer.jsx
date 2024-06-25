import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, MapPin, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="divide-y-2 divide-gray-100 border-t bg-white">
      <div className="container space-y-4 py-10">
        <div className="flex flex-col items-center justify-center">
          <figure className="inline-block rounded-lg p-2">
            <Image src={"/logo.webp"} width={120} height={120} alt="logo" />
          </figure>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a
              href="https://www.facebook.com/profile.php?id=61555145229580"
              target="_blank"
            >
              <FaFacebookF size={20} />
            </a>
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a href="https://www.instagram.com/infrakeys_technologies/">
              <FaInstagram size={20} />
            </a>
          </Button>
          {/* <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a href="javascript:void(0);">
              <FaXTwitter size={20} />
            </a>
          </Button> */}
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a
              href="https://www.linkedin.com/company/infrakeys-technologies/"
              target="_blank"
            >
              <FaLinkedinIn size={20} />
            </a>
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a
              href="https://www.youtube.com/@infrakeystechnologies"
              target="_blank"
            >
              <FaYoutube size={20} />
            </a>
          </Button>
        </div>

        <div className="">
          <ul className="flex items-center justify-center gap-8">
            {["home", "about", "products", "blogs", "contact"].map((item) => (
              <li key={item} className="">
                <Link
                  href={item === "home" ? "/" : `/${item}`}
                  className="text-sm capitalize transition-colors hover:text-primary"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 grid w-full grid-cols-12 gap-4 text-sm text-gray-900">
          <div
            className={
              "col-span-4 flex h-full items-center justify-start gap-2 rounded-lg border bg-white p-2"
            }
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <PhoneCall />
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <p>+91 8130376622</p>
            </div>
          </div>

          <div
            className={
              "col-span-4 flex h-full items-center justify-start gap-2 rounded-lg border bg-white p-2"
            }
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <Mail />
            </div>
            <div>
              <span className="font-semibold">Email</span>
              <p>sales@infrakeys.com</p>
            </div>
          </div>

          <div
            className={
              "col-span-4 flex h-full items-center justify-start gap-2 rounded-lg border bg-white p-2"
            }
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <MapPin />
            </div>
            <div>
              <span className="font-semibold">Address</span>
              <p>
                519-521, 5th floor, The Business Hub, Sector-81, <br /> Greater
                Faridabad, 121007, Haryana
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="bg-black text-white">
        <div className="container flex items-center justify-between py-3 text-sm">
          <span>Copyright © {new Date().getFullYear()} by Infrakeys</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
