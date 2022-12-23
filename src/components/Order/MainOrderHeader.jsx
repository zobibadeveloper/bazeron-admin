import currency from 'currency.js';
import React from 'react'
import Tr from '../Tr';
import { getCityById } from '../../constants/cities';

export default function MainOrderHeader({ mainOrder }) {
  const { name, city, phone } = mainOrder.address;
  const { createdAt, _id } = mainOrder;
  // date format as DD/MM/YYYY HH:MM
  let totalPrice = 0;
  mainOrder.orders.forEach((product) => {
    totalPrice = currency(product.total_price).add(totalPrice).value;
  });
  const date = new Date(createdAt);
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    <table className="table table-striped mb-0">
      <tbody>
        <Tr title={"Id"} value={_id} />
        <Tr title={"Üye"} value={name} />
        <Tr title={"Telefon"} value={phone} />
        <Tr title={"Toplam"} value={totalPrice} />
        <Tr title={"Şehir"} value={getCityById(city)["name_tr"]} />
        <Tr title={"Tarih"} value={dateStr} />
      </tbody>
    </table>
  )
}
