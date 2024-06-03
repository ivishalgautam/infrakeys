"use client";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  router.push("/");
  return <div>About</div>;
}
