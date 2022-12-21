import React from 'react'
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';

export default function Buttons({ status, link = null, data = null, _id }) {
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

  return (
    <div className='d-flex w-100 items-center'>
      {buttons.map((button, index) => (
        <button key={index} onClick={() => getClick(button)} className={`btn w-100 btn-sm m-0 btn-${button.color} text-small`}>{button.name}</button>
      ))}
    </div>
  )
}
