import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';

export default function Buttons({ status, link = null, _id, api_id }) {
  const { user } = useAuth();
  const { ButtonInstance, removeOrder } = useOrder();
  if (!user) return null;

  const buttons = ButtonInstance.getButtons(status);

  const onSucess = () => {
    removeOrder(_id);
    toast.success("İşlem başarılı");
  }

  const getClick = async (button) => {
    if (button.link === true) {
      button.onClick(link);
    } else if (button.checkForm === true) {
      try {
        const response = await button.onClick(data);
        if (response.data.status === 200) {
          onSucess();
        }
      } catch (error) {
        console.log(error);
        toast.error("Hata oluştu");
      }
    } else {
      try {
        const response = await button.onClick(_id);
        if (response.data.status === 200) {
          onSucess();
        }
      } catch (error) {
        console.log(error)
        toast.error("Hata oluştu");
      }
    }
  }

  const Form = () => {
    const formPlaceholders = { cargo_id: "Kargo Numarası", api_order_id: "Sipariş Numarası", api_sent_id: "Teslimat Numarası", api_tl_price: "Satın Alınan Tutar", api_merchant_name: "Mağaza Adı", api_platform_name: "Platform" };
    const [fields, setFields] = useState({ cargo_id: "", api_order_id: "", api_sent_id: "", api_tl_price: "", api_merchant_name: "", api_platform_name: api_id === 2 ? "Needion" : "" });
    if (user.role === "ADMIN") {
      return (
        <form action="/admin/order/change-status" method="POST" className='mt-1'>
          {Object.keys(fields).map((key, index) => (
            <input key={index} placeholder={formPlaceholders[key]} className="form-control py-1 text-small" type="text" name={key} value={fields[key]} onChange={(e) => setFields({ ...fields, [key]: e.target.value })} />
          ))}
        </form>
      )
    }
    return null;
  }

  return (
    <>
      {<Form />}
      <div className='d-flex w-100 items-center'>
        {buttons.map((button, index) => (
          <button key={index} onClick={() => getClick(button)} className={`btn w-100 btn-sm m-0 btn-${button.color} text-small`}>{button.name}</button>
        ))}
      </div>
    </>
  )
}
