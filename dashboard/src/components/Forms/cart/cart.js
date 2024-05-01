import React from "react";
import BuyForm from "./buy";
import SellForm from "./sell";

export default function CartFrom({ data, handleCreate }) {
  const cartData = Object.groupBy(data, ({ item_type }) => item_type);
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <BuyForm data={cartData.buy} handleCreate={handleCreate} />
      </div>

      <div>
        <SellForm data={cartData.sell} handleCreate={handleCreate} />
      </div>
    </div>
  );
}
