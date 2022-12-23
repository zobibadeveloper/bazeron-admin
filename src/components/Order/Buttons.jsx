import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import { getApiLink } from '../../helpers/getLinks';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Buttons({ product }) {
  const { _id, status, api_id, api_friendly_url } = product;
  const { user } = useAuth();
  const { ButtonInstance, removeOrder } = useOrder();
  if (!user) return null;
  const formPlaceholders = { cargo_id: "Kargo Numarası", api_order_id: "Sipariş Numarası", api_sent_id: "Teslimat Numarası", api_tl_price: "Satın Alınan Tutar", api_merchant_name: "Mağaza Adı", api_platform_name: "Platform" };
  const [fields, setFields] = useState({ cargo_id: "", api_order_id: "", api_sent_id: "", api_tl_price: "", api_merchant_name: "", api_platform_name: api_id === 2 ? "Needion" : "" });

  const buttons = ButtonInstance.getButtons(status);

  const apiLink = getApiLink(api_id, api_friendly_url);

  // if any key except cargo_id is empty, return false
  const checkForm = () => {
    for (const key in fields) {
      if (key !== "cargo_id" && fields[key] === "") {
        return false;
      }
    }
    return true;
  }

  const onSucess = () => {
    removeOrder(_id);
    toast.success("İşlem başarılı");
  }

  const onConfirm = (button) => {
    confirmAlert({
      title: 'Onay',
      message: 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Evet',
          className: "btn-confirm btn-confirm-accent",
          onClick: async () => {
            try {
              const response = await button.onClick({ _id, ...fields });
              if (response.data.status === 200) {
                onSucess();
              }
            } catch (error) {
              console.log(error);
              toast.error("Hata oluştu");
            }
          }
        },
        {
          label: 'Hayır',
          className: "btn-confirm btn-confirm-alert",
          onClick: () => { }
        }
      ]
    });
  }

  const getClick = async (button) => {
    if (button.link === true) {
      button.onClick(apiLink);
    } else if (button.checkForm === true) {
      // check all fields are not empty except cargo_id
      if (!checkForm()) {
        toast.error("Lütfen tüm alanları doldurun");
        return;
      }
      onConfirm(button);
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

  const form = () => {
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
      {form()}
      <div className='d-flex w-100 items-center'>
        {buttons && buttons.map((button, index) => {
          const isDisabled = button.checkForm === true && !checkForm();
          return (
            <button disabled={isDisabled} key={index} onClick={() => getClick(button)} className={`btn w-100 btn-sm m-0 btn-${button.color} text-small`}>{button.name}</button>
          )
        })}
      </div>
    </>
  )
}
