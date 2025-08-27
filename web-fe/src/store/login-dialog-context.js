"use client";

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
import LoginForm from "@/components/forms/login";
import OTPForm from "@/components/forms/otp";

export const LoginDialogContext = createContext(null);

function LoginDialogProvider({ children, isActive = true }) {
  const [open, setOpen] = useState(false);
  const { user, isUserLoading } = useContext(MainContext);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [requestId, setRequestId] = useState(null);

  const pathname = usePathname();
  useEffect(() => {
    if (!isActive) return;
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
  }, [user, isUserLoading, pathname, isActive]);

  if (!isActive) return children;

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
            {!isOtpSent ? (
              <LoginForm
                setIsOtpSent={setIsOtpSent}
                setPhone={setPhone}
                requestId={requestId}
                setRequestId={setRequestId}
              />
            ) : (
              <OTPForm
                phone={phone}
                requestId={requestId}
                setRequestId={setRequestId}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </LoginDialogContext.Provider>
  );
}

export default LoginDialogProvider;
