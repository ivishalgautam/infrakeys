"use client";
import POForm from "@/components/forms/po";
import ProfileLayout from "@/components/layout/profile-layout";
import Modal from "@/components/Modal";
import PurchaseOrder from "@/components/PurchaseOrder";
import OrderItemTable from "@/components/table/order-item-table";
import SingleOrderTable from "@/components/table/single-order-table";
import { H4 } from "@/components/ui/typography";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const updateOrder = (data) => {
  return http().put(`${endpoints.orders.getAll}/${data.enquiry_id}`, data);
};

export default function Page({ params: { slug } }) {
  const [isModal, setIsModal] = useState(false);
  const { data } = useQuery({
    queryFn: fetchOrder,
    queryKey: [`order-${slug}`],
    enabled: !!slug,
  });
  const queryClient = useQueryClient();

  async function fetchOrder() {
    const { data } = await http().get(`${endpoints.orders.getAll}/${slug}`);
    return data;
  }

  const updateMutation = useMutation(updateOrder, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries([`order-${slug}`]);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message);
    },
  });

  return (
    <ProfileLayout>
      <div className="space-y-4">
        <H4>Tracking details</H4>
        {/* details */}
        <div className="col-span-7 md:col-span-5">
          <SingleOrderTable data={data} />
        </div>

        <OrderItemTable data={data} />
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
