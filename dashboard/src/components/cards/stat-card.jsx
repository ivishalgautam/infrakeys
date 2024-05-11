import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { IoIosStats } from "react-icons/io";

export default function StatCard({ title, count }) {
  const numberFormat = new Intl.NumberFormat("en-IN");
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-sm capitalize">{title}</span>
          <span>
            <IoIosStats />
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{numberFormat.format(count)}</CardTitle>
        {/* <CardDescription>+20.1% from last month</CardDescription> */}
      </CardContent>
    </Card>
  );
}
