import ContactForm from "@/components/forms/contact";
import { H3, Small } from "@/components/ui/typography";

export default function Page() {
  return (
    <section className="py-14">
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-8 rounded-md bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <H3>Drop us a line</H3>
            <Small className={"text-gray-400"}>
              Contact us for any question
            </Small>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
