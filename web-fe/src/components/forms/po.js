import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Eye } from "lucide-react";
import http from "@/utils/http";
import { toast } from "sonner";

export default function POForm({
  id,
  poFile,
  poNumber,
  updateMutation,
  closeModal,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: { po_file: poFile, po_number: poNumber },
  });

  const [token] = useLocalStorage("token");

  const handleFileChange = async (event) => {
    try {
      const selectedFiles = Array.from(event.target.files);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.files.upload}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      updateMutation.mutate({ po_file: data?.path[0], enquiry_id: id });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteFile = async (filePath) => {
    try {
      const resp = await http().delete(
        `${endpoints.files.getFiles}?file_path=${filePath}`,
      );
      updateMutation.mutate({ po_file: "", enquiry_id: id });
    } catch (error) {
      console.log(error);
      toast.error("error deleting image");
    }
  };

  const onSubmit = (data) => {
    updateMutation.mutate({ po_number: data.po_number, enquiry_id: id });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 p-4">
        <div>
          <Label>PO Number</Label>
          <Input
            {...register("po_number", { required: "required*" })}
            placeholder="Enter po number"
          />
        </div>
        <div className="rounded-md border p-4">
          <Label>Upload Signed Purchase Order</Label>
          <Input
            type="file"
            {...register("file")}
            onChange={handleFileChange}
          />
        </div>
        <div>
          {poFile && (
            <div className="flex items-center justify-between rounded-md border p-2 text-xs">
              <span className="truncate">{poFile?.split("/").pop()}</span>
              <div className="flex items-center justify-center gap-2">
                <Button type="button" variant="outline" size="icon">
                  <a
                    target="_vishal"
                    href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${poFile}`}
                  >
                    <Eye />
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteFile(poFile)}
                >
                  <MdDelete size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="text-right">
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
}
