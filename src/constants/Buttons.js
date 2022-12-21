import axiosIns from "../utils/axios";

class Buttons {
  constructor(role) {
    this.role = role;
    this._onApprove = this._onApprove.bind(this);
    this._changeStatus = this._changeStatus.bind(this);
    this.axios = axiosIns;
    this.buttons = {
      "ADMIN": {
        1: [
          { name: "Onayla", color: "primary", checkForm: true, link: false, onClick: this._onApprove },
          { name: "Satın Al", color: "success", checkForm: false, link: true, onClick: (link) => window.open(link, '_blank') },
          { name: "Tedarik Edilemedi", color: "danger", checkForm: false, link: false, onClick: (_id) => this._changeStatus({ status: 9, _id }) },
        ]
      }
    }
  }

  getButtons(status) {
    return this.buttons[this.role][status];
  }

  getButton(status, name) {
    return this.buttons[this.role][status].find((button) => button.name === name);
  }

  _onApprove({ _id, status, ...rest }) {
    return this.axios.post("/admin/order/approve", { _id, status, ...rest });
  }

  _changeStatus({ status, _id }) {
    return this.axios.patch("/admin/order/status", { status, order_id: _id });
  }
}

export default Buttons;