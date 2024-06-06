import QueryForm from "@/components/forms/query";

export const metadata = {
  title:
    "Contact us +91 8130376622 - Wire Mesh, Steel Manufacturers, Scaffolding manufacturers",
  description:
    "Contact Infrakeys- Primary TMT, Channel, Purlins, Ms Angle, Wire Mesh, Steel Manufacturers, Scaffolding manufacturers, Nails & Fasteners Supplier in Haryana, India",
  keywords:
    "Primary TMT, SAIL TMT, MS Channel, Purlins, Ms Angle, Wire Mesh, Steel Manufacturers, Scaffolding manufacturers, Nails & Fasteners Supplier in Haryana, Steel Fabricators, TMT suppliers in Faridabad, TMT suppliers in India, PEB manufacturers in India, Quality building products Industrial Steel, Instant steel raw material, ISMC,ISA 9899061621",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  },
  openGraph: {
    title:
      "Contact us +91 8130376622 - Wire Mesh, Steel Manufacturers, Scaffolding manufacturers",
    description:
      "Contact Infrakeys- Primary TMT, Channel, Purlins, Ms Angle, Wire Mesh, Steel Manufacturers, Scaffolding manufacturers, Nails & Fasteners Supplier in Haryana, India",
  },
};
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
