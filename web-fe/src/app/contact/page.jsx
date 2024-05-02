import ContactForm from "@/components/forms/contact";
import QueryForm from "@/components/forms/query";
import { H3, Small } from "@/components/ui/typography";

export default function Page() {
  return (
    <section className="py-14">
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-8 rounded-md bg-white p-8">
          <div>
            <QueryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
