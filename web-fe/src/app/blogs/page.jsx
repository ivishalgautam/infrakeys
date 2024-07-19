import Blogs from "@/components/blogs";
import { H1 } from "@/components/ui/typography";

export const metadata = {
  title: "Blogs | Infrakeys",
  description: "Infrakeys Blogs",
  openGraph: {
    title: "Infrakeys Blogs",
    description: "Infrakeys Blogs",
  },
  alternates: {
    canonical: `/blogs`,
  },
};

export default function Page() {
  return (
    <div className="container py-4">
      <H1 className={"my-8 text-center"}>Our blogs</H1>
      <Blogs />
    </div>
  );
}
