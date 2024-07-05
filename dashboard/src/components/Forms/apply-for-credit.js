"use client";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import Spinner from "../Spinner";

const applyForCredit = async (data) => {
  return await http().post(endpoints.creditApplies.getAll, data);
};

export default function ApplyForCreditForm({ id }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const createMutation = useMutation(applyForCredit, {
    onSuccess: (data) => {
      toast.success(data.message ?? "Application sent.");
      reset();
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      company_name: data.company_name,
      turnover: data.turnover,
      funds_required: data.funds_required,
      industry: data.industry,
    };
    handleCreate(payload);
  };

  function handleCreate(data) {
    createMutation.mutate(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await http().get(
          `${endpoints.creditApplies.getAll}/${id}`
        );
        setValue("name", data.name);
        setValue("phone", data.phone);
        setValue("company_name", data.company_name);
        setValue("turnover", data.turnover);
        setValue("funds_required", data.funds_required);
        setValue("industry", data.industry);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <H2>Details</H2>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* customer name */}
        <div>
          <Label>Customer name</Label>
          <Input
            type="text"
            placeholder="Customer name"
            {...register("name")}
            disabled
          />
        </div>

        {/* phone */}
        <div>
          <Label>Phone</Label>
          <Input
            type="text"
            placeholder="Phone"
            {...register("phone")}
            disabled
          />
        </div>

        {/* company name */}
        <div>
          <Label>Company name</Label>
          <Input
            type="text"
            placeholder="Company name"
            {...register("company_name")}
            disabled
          />
        </div>

        {/* turnover */}
        <div>
          <Label>Turnover</Label>
          <Controller
            control={control}
            name="turnover"
            disabled
            rules={{ required: "Please select your turnover." }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled
              >
                <SelectTrigger>
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
          <Label>Funds required</Label>
          <Input
            type="text"
            placeholder="Funds required"
            {...register("funds_required")}
            disabled
          />
        </div>

        {/* industry */}
        <div>
          <Label>Industry</Label>
          <Input
            type="text"
            placeholder="Industry"
            {...register("industry")}
            disabled
          />
        </div>
      </div>
    </form>
  );
}
