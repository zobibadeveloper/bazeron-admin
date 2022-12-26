import { confirmAlert } from 'react-confirm-alert';

const onConfirm = (onConfirm) => {
  confirmAlert({
    title: 'Onay',
    message: 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
    buttons: [
      {
        label: 'Evet',
        className: "btn-confirm btn-confirm-accent",
        onClick: async () => {
          try {
            onConfirm();
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

export default onConfirm;