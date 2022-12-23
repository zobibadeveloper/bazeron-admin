import React from 'react'
import Buttons from './Buttons';
import Tr from '../Tr';
import { getProductLink } from '../../helpers/getLinks';

export default function Order({ product }) {
  const { product_name, main_image, images, price, api_id, api_product_id, quantity, total_price, api_variant_name, _id, status } = product;
  const image = main_image || images[0];
  const productLink = getProductLink(api_id, api_product_id);

  return (
    <div>
      <div className="d-flex justify-between gap-2">
        <a onClick={(e) => {
          e.preventDefault();
          window.open(productLink, "_blank");
        }}>
          <img src={image} className="max-width-100" loading='lazy' />
        </a>
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
      <Buttons product={product} />
    </div>
  );
}
