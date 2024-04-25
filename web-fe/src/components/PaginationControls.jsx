"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function PaginationControls({ total_page }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page =
    typeof searchParams.get("page") === "string"
      ? Number(searchParams.get("page"))
      : 1;

  const handlePageChange = (page) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", Math.max(1, page));
    router.push(`?${params.toString()}`);
  };

  return (
    total_page > 1 && (
      <div className="mt-6 space-x-4">
        <Button
          onClick={() => handlePageChange(Number(searchParams.get("page")) - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Button
          disabled={total_page === page}
          onClick={() => handlePageChange(Number(searchParams.get("page")) + 1)}
        >
          Next
        </Button>
      </div>
    )
  );
}
