import { Eye, FileUp, FolderUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Large, P } from "./ui/typography";

export default function PurchaseOrder({ setIsModal, data, updateMutation }) {
  return (
    <div className="flex flex-col items-start justify-center space-y-2">
      <div
        onClick={() => setIsModal(true)}
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary bg-primary/10 px-10 py-6 text-primary"
      >
        <FolderUp size={40} />
        <Large>Upload Signed PO</Large>
      </div>
      <div className="max-w-full">
        {data?.po_file && (
          <div className="flex items-center justify-between rounded-md border p-2 text-xs">
            <span className="truncate">{data?.po_file}</span>
            <div className="flex items-center justify-center gap-2">
              <Button type="button" variant="outline" size="icon">
                <a
                  target="_vishal"
                  href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${data?.po_file}`}
                >
                  <Eye />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
