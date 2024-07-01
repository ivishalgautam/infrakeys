import { toast } from "sonner";

export const handleWhatsAppEnq = (
  e,
  customer_name,
  product_name,
  enqFor,
  filters,
) => {
  e.stopPropagation();
  if (!enqFor) return toast.warning("Please select enquiry for.");
  let filtersStr = "";

  for (const key in filters) {
    if (!filters[key].length) continue;
    filtersStr += `${String(key).toUpperCase()}: ${String(filters[key].join(", ")).toUpperCase()}\n`;
  }

  const text = String(`
Hi, I am ${String(customer_name).charAt(0).toUpperCase() + String(customer_name).slice(1)}

I want to ${String(enqFor).toUpperCase()} this product

Product Details
Product name: ${product_name.charAt(0).toUpperCase() + product_name.slice(1)}

More details below:
${filtersStr}

Can you please provide rates and other details of the product?`);

  return (window.location.href = `https://api.whatsapp.com/send/?phone=7011691802&text=${encodeURIComponent(text)}`);
};
