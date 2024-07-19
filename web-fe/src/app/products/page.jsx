import Categories from "../categories";

export const metadata = {
  title:
    "MS Rails, GI Binding Wire, MS Binding Wire, Round Pipe, CR Sheet, HPRO Sheets, PPGl Coil, GI Coil",
  description:
    "Infrakeys offer quality Product MS Rails, GI Binding Wire, MS Binding Wire, Round Pipe, PPGl Coil, GI Coil, Ledger 2mm, Vertical 3mm, PPGL Coil 0.5mm at the best prices",
  keywords:
    "MS Rails Suppliers, GI Binding Wire Manufacturers, MS Binding Wire, GI Binding Wire Suppliers near me, Round PipeSuppliers, CR Sheet suppliers, HPRO Sheets Suppliers, PPGl Coil Manufacturers, GI Coil Manufacturers, MS Rails Suppliers, GI Binding Wire Suppliers, MS Binding Wire Suppliers, Round Pipe Suppliers, CR Sheet Suppliers, HPRO Sheets Suppliers, PPGl Coil Suppliers, GI Coil Suppliers",
  openGraph: {
    title:
      "MS Rails, GI Binding Wire, MS Binding Wire, Round Pipe, CR Sheet, HPRO Sheets, PPGl Coil, GI Coil",
    description:
      "Infrakeys offer quality Product MS Rails, GI Binding Wire, MS Binding Wire, Round Pipe, PPGl Coil, GI Coil, Ledger 2mm, Vertical 3mm, PPGL Coil 0.5mm at the best prices",
  },
  alternates: {
    canonical: `/products`,
  },
};

export default function Page() {
  return (
    <section className="py-6">
      <div className="container">
        <div>
          <Categories />
        </div>
      </div>
    </section>
  );
}
