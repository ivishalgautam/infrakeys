import { cn } from "@/lib/utils";

export default function AuthLayout({ children, className }) {
  return (
    <section className={cn("bg-gray-200 py-16", className)}>
      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border bg-white">
        {/* left */}
        {/* <div className="flex h-auto flex-1 items-center justify-center bg-secondary py-0 lg:py-16">
            <figure>
              <Image
                src={"/jcb-login-side.png"}
                width={500}
                height={500}
                alt="jcb"
              />
            </figure>
          </div> */}

        {/* right */}
        <div className="w-full pb-8">{children}</div>
      </div>
    </section>
  );
}
