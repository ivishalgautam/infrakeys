"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { H2 } from "../ui/typography";

const createQuery = async (data) => {
  return await http().post(endpoints.queries.getAll, data);
};

export default function ApplyForCreditForm() {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();

  const createMutation = useMutation(createQuery, {
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    return;
    createMutation.mutate(data);
  };

  const className = "bg-gray-100 rounded-[60px] p-6 py-5.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <H2>Enter details</H2>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* company name */}
        <div>
          <Input
            type="text"
            placeholder="Company name"
            {...register("company_name", {
              required: "required",
            })}
            className={className}
          />
          {errors.company_name && (
            <span className="text-red-600">{errors.company_name.message}</span>
          )}
        </div>

        {/* turnover */}
        <div>
          <Controller
            control={control}
            name="turnover"
            render={({ field }) => (
              <Select>
                <SelectTrigger className="rounded-full bg-gray-100 !py-6 px-4">
                  <SelectValue placeholder="Select your turnover" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Turovers</SelectLabel>
                    <SelectItem value="1-5cr">1-5 CR</SelectItem>
                    <SelectItem value="5-15cr">5-15 CR</SelectItem>
                    <SelectItem value="15-50cr">15-50 CR</SelectItem>
                    <SelectItem value="above 1000cr">Above 1000 CR</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* funds required */}
        <div>
          <Input
            type="text"
            placeholder="Funds required"
            {...register("funds_required", {
              required: "required",
            })}
            className={className}
          />
          {errors.funds_required && (
            <span className="text-red-600">
              {errors.funds_required.message}
            </span>
          )}
        </div>

        {/* industry */}
        <div>
          <Input
            type="text"
            placeholder="Industry"
            {...register("industry", {
              required: "required",
            })}
            className={className}
          />
          {errors.industry && (
            <span className="text-red-600">{errors.industry.message}</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button className="rounded-full">Submit</Button>
      </div>
    </form>
  );
}
