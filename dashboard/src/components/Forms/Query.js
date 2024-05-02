"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { FaRegTrashCan } from "react-icons/fa6";
import Spinner from "../Spinner";

export default function QueryForm({ handleDelete, queryId }) {
  const { register, setValue, watch } = useForm();

  const fetchQueryById = async () => {
    const { data } = await http().get(`${endpoints.queries.getAll}/${queryId}`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchQueryById,
    queryKey: [`query-${queryId}`],
    enabled: !!queryId,
  });

  useEffect(() => {
    data && setValue("type", data?.type);
    data && setValue("name", data?.name);
    data && setValue("email", data?.email);
    data && setValue("company", data?.company);
    data && setValue("company_gst", data?.company_gst);
    data && setValue("phone", data?.phone);
    data && setValue("pincode", data?.pincode);
    data && setValue("message", data?.message);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      <Title text={"Query"} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* name */}
        <div>
          <Label>Name</Label>
          <Input
            disabled
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "required",
            })}
          />
        </div>

        {/* email */}
        <div>
          <Label>Email</Label>
          <Input
            disabled
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "required",
            })}
          />
        </div>

        {/* pincode or company gst */}
        {watch("type") === "buy" ? (
          <div>
            <Label>Pincode</Label>
            <Input
              disabled
              type="text"
              placeholder="pincode"
              {...register("pincode", {
                required: "required",
              })}
            />
          </div>
        ) : (
          <div>
            <Label>Company GST</Label>
            <Input
              disabled
              type="text"
              placeholder="company_gst"
              {...register("company_gst", {
                required: "required",
              })}
            />
          </div>
        )}

        {/* phone */}
        <div>
          <Label>Mobile</Label>
          <Input
            disabled
            type="number"
            placeholder="Phone"
            {...register("phone", {
              required: "required",
              valueAsNumber: true,
            })}
          />
        </div>

        {/* message */}
        <div className="md:col-span-2">
          <Label>Message</Label>
          <Textarea
            disabled
            placeholder="Message"
            {...register("message", {
              required: "required",
            })}
          />
        </div>
      </div>

      <div>
        <Button
          variant="destructive"
          size="icon"
          type="button"
          onClick={() => handleDelete(queryId)}
        >
          <FaRegTrashCan />
        </Button>
      </div>
    </div>
  );
}
