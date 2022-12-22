import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ButtonsClass from "../constants/buttons";
import axiosIns from "../utils/axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [{ data, nextPage, totalQuantity, hasMore, count }, setData] = useState({ data: [], nextPage: 1, totalQuantity: 0, hasMore: true, count: 0 });
  const { user, isAuthenticated } = useAuth();
  const ButtonInstance = user ? new ButtonsClass(user.role) : null;

  const fetchData = async () => {
    try {
      const response = await axiosIns.get('/admin/orders', { params: { page: nextPage } });
      if (response.data.status !== 200) throw new Error('Error fetching data');
      setData(prev => {
        const mainOrders = response.data.data;
        const { totalQuantity, count } = response.data.statistics;
        if (!mainOrders || mainOrders.length === 0) return {
          ...prev,
          totalQuantity: totalQuantity,
          count: count,
          hasMore: false
        }
        const lastMainOrder = mainOrders[mainOrders.length - 1];
        return {
          data: [...prev.data, ...mainOrders],
          lastOrderId: lastMainOrder._id,
          totalQuantity: totalQuantity,
          nextPage: parseInt(response.data.current_page) + 1,
          hasMore: true,
          count: count
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const removeOrder = (_id) => {
    setData(prev => {
      const mainOrders = prev.data.map((mainOrder, index) => {
        mainOrder.orders = mainOrder.orders.filter(order => order._id !== _id);
        return mainOrder;
      })
      return {
        ...prev,
        data: mainOrders
      }
    })
  }

  useEffect(() => {
    if (data.length === 0 && isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated])

  return (
    <OrderContext.Provider value={{ data, nextPage, count, totalQuantity, hasMore, ButtonInstance, fetchData, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;