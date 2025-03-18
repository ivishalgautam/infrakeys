"use client";

import LoginForm from "@/components/forms/login";
import Login from "@/components/login";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MainContext } from "./context";
import { usePathname } from "next/navigation";

export const LoginDialogContext = createContext(null);

function LoginDialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const { user, isUserLoading } = useContext(MainContext);
  const pathname = usePathname();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !isUserLoading &&
        !user &&
        !["/auth/login", "/auth/signup", "category"].some((path) =>
          pathname.includes(path),
        )
      ) {
        setOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [user, isUserLoading, pathname]);

  return (
    <LoginDialogContext.Provider value={{ open, setOpen }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">Login</DialogTitle>
            <DialogDescription className="sr-only">Login.</DialogDescription>
          </DialogHeader>
          <div>
            <Login className={"bg-white p-0"} />
          </div>
        </DialogContent>
      </Dialog>
    </LoginDialogContext.Provider>
  );
}

export default LoginDialogProvider;
