import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { H2 } from "../ui/typography";
import { Button } from "../ui/button";
import axios from "axios";
import { endpoints } from "@/utils/endpoints";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Progress } from "../ui/progress";
import Image from "next/image";

export default function RequirementForm({
  handleCreate,
  filePath,
  setFilePath,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [token] = useLocalStorage("token");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const handleFileChange = async (event) => {
    setIsUploading(true);
    try {
      const selectedFiles = Array.from(event.target.files);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.files.upload}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            );
            setProgress(progress);
          },
        },
      );

      setFilePath((prev) => [...prev, ...response.data?.path]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setProgress(0);
      setIsUploading(false);
    }
  };

  const onSubmit = (data) => {
    handleCreate({ docs: filePath });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <H2>Upload your requirements.</H2>

          {
            <div>
              <Label>Select file</Label>
              <Input
                type="file"
                {...register("file", {
                  required: "required*",
                })}
                onChange={handleFileChange}
                multiple
              />
              {errors.file && (
                <span className="text-red-500">{errors.file.message}</span>
              )}
            </div>
          }

          {isUploading ? (
            <Progress value={progress} />
          ) : (
            <Button>Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
}
