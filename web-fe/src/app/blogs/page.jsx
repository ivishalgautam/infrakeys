import Blogs from "@/components/blogs";
import { H1 } from "@/components/ui/typography";

export default function Page() {
  return (
    <div className="container py-4">
      <H1 className={"my-8 text-center"}>Our blogs</H1>
      <Blogs />
    </div>
  );
}
