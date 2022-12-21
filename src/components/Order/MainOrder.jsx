import React from "react";
import useOrder from "../../hooks/useOrder";
import MainOrderHeader from "./MainOrderHeader";
import Order from "./Order";

export default function MainOrder({ mainOrder }) {

  return (
    <div className="border rounded mx-2 bg-white overflow-hidden card text-small w-100 shadow-lg" style={{ maxWidth: "800px" }}>
      <div className="p-2 pb-0">
        <MainOrderHeader mainOrder={mainOrder} />
      </div>
      <div className="card-body p-2 pt-0 d-flex flex-column gap-2 border">
        {mainOrder.orders.map((product) => {
          return (
            <Order product={product} key={product._id} />
          )
        }
        )}
      </div>
    </div>
  );
}
