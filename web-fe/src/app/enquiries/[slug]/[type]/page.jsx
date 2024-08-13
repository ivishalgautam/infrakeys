"use client";
import POForm from "@/components/forms/po";
import ProfileLayout from "@/components/layout/profile-layout";
import Modal from "@/components/Modal";
import PurchaseOrder from "@/components/PurchaseOrder";
import Spinner from "@/components/Spinner";
import EnquiryItemTable from "@/components/table/enquiry-item-table";
import SingleEnquiryTable from "@/components/table/single-enquiry-table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { H4 } from "@/components/ui/typography";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const updateEnquiry = (data) => {
  return http().put(`${endpoints.enquiries.getAll}/${data.enquiry_id}`, data);
};

const convertToOrder = ({ id }) => {
  return http().post(`${endpoints.enquiries.getAll}/convertToOrder/${id}`, {});
};

export default function Page({ params: { slug } }) {
  const [isModal, setIsModal] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchEnquiry,
    queryKey: [`enquiry-${slug}`],
    enabled: !!slug,
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  async function fetchEnquiry() {
    const { data } = await http().get(`${endpoints.enquiries.getAll}/${slug}`);
    return data;
  }

  const updateMutation = useMutation(updateEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries([`enquiry-${slug}`]);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message);
    },
  });

  const convertToOrderMutation = useMutation(convertToOrder, {
    onSuccess: (data) => {
      toast.success(data?.message ?? "Coverted to order.");
      queryClient.invalidateQueries("enquiries");
      router.push("/profile/enquiries?status=closed");
    },
    onError: (error) => {
      // console.log({ error });
      toast.error(error.message);
    },
  });
  const handleConvertToOrder = ({ id }) => {
    convertToOrderMutation.mutate({ id });
  };

  if (isLoading) return <Spinner />;
  if (isError) return error?.message ?? "error";

  return (
    <ProfileLayout>
      <div className="space-y-4">
        <H4>Tracking details</H4>
        <div className="grid grid-cols-7 gap-2">
          {/* details */}
          <div className="col-span-7 md:col-span-5">
            <SingleEnquiryTable data={data} />
          </div>

          <div className="col-span-7 md:col-span-2">
            {/* po file */}
            <div className="col-span-5 md:col-span-2">
              <PurchaseOrder
                updateMutation={updateMutation}
                setIsModal={() => setIsModal(true)}
                data={data}
              />
            </div>
            {data?.quotation_file && (
              <>
                <Label>Quotation file</Label>
                <div className="flex items-center justify-between rounded-md border px-2 text-xs">
                  <span className="text-ellipsis">
                    {String(data?.quotation_file?.split("/")[1]).substring(
                      0,
                      30,
                    )}
                    ...{" "}
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <Button type="button" variant="outline" size="icon">
                      <a
                        target="_vishal"
                        href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${data?.quotation_file}`}
                      >
                        <Eye />
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <EnquiryItemTable data={data} enquiryId={slug} />

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="default"
            onClick={() => handleConvertToOrder({ id: slug })}
            disabled={!data?.po_file || !data?.po_number}
          >
            Convert to order
          </Button>
        </div>
      </div>
      <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
        <POForm
          id={data?.id}
          poFile={data?.po_file}
          poNumber={data?.po_number}
          updateMutation={updateMutation}
          closeModal={() => setIsModal(false)}
        />
      </Modal>
    </ProfileLayout>
  );
}
