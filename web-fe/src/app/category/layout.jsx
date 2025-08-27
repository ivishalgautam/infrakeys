"use client";
import ProfileForm from "@/components/forms/profile";
import Login from "@/components/login";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MainContext } from "@/store/context";
import React, { useContext, useState } from "react";

export default function Layout({ children }) {
  const { user } = useContext(MainContext);
  const [open, setOpen] = useState(
    user
      ? !["name", "phone", "email", "company_name"].every((key) =>
          Boolean(user[key]),
        )
      : true,
  );

  return children;

  return (
    <React.Fragment>
      <AlertDialog open={open}>
        <AlertDialogContent overlayClassName="bg-gray-900/40 backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="sr-only">
              Complete profile
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Complete you profile
            </AlertDialogDescription>
            {!user ? (
              <Login className={"bg-white p-0"} />
            ) : (
              <ProfileForm
                completeProfile={true}
                callback={() => setOpen(false)}
              />
            )}
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </React.Fragment>
  );
}
