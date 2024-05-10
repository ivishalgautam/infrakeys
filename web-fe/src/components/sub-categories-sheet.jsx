"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";

export default function SubCategoriesSheet({ children }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-scroll md:hidden">
        <div className="grid gap-4 py-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
