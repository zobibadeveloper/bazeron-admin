import { useContext } from "react";
import OrderContext from "../context/OrderContext";

const useOrder = () => useContext(OrderContext);

export default useOrder;