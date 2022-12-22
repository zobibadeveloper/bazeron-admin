import React from 'react'
import useAuth from '../../hooks/useAuth';
import Buttons from '../Buttons/Buttons';
import Tr from '../Tr';

export default function Order({ product}) {
  const { product_name, main_image, images, price, price_tl, quantity, total_price, api_variant_name, _id, status, api_id } = product;
  const image = main_image || images[0];

  return (
    <div>
      <div className="d-flex justify-between gap-2">
        <img src={image} className="max-width-100" />
        <table className="table mb-0">
          <tbody>
            <Tr title={"Adı"} value={product_name} />
            <Tr title={"Varyant"} value={api_variant_name} />
            <Tr title={"Status"} value={status} />
            <Tr title={"Fiyat"} value={price} />
            <Tr title={"Adet"} value={quantity} />
            <Tr title={"Toplam"} value={total_price} />
            <Tr title={"Id"} value={_id} />
          </tbody>
        </table>
      </div>
      <Buttons status={status} _id={_id} api_id={api_id} />
    </div>
  );
}
