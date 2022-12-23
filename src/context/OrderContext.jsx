import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ButtonsClass from "../constants/buttons";
import axiosIns from "../utils/axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [{ data, nextPage, totalQuantity, hasMore, count, order_status }, setData] = useState({ data: [], nextPage: 1, totalQuantity: 0, hasMore: true, count: 0 });
  const { user, isAuthenticated } = useAuth();
  const ButtonInstance = user ? new ButtonsClass(user.role) : null;
  const [filter, setFilter] = useState({ order_status: order_status, city_id: "all", user_name: '', product_name: '' });

  const handleFilterChange = (e) => {
    setFilter(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })

    if (e.target.name === 'order_status') {
      fetchData({ order_status: e.target.value, page: 1 });
    }

    if (e.target.name === 'city_id') {
      fetchData({ city_id: e.target.value, page: 1 });
    }
  }

  const fetchData = async (extraFilter = {}) => {
    try {
      const response = await axiosIns.get('/admin/order', { params: { page: nextPage, ...filter, ...extraFilter } });
      if (response.data.status !== 200) throw new Error('Error fetching data');
      let order_status = response.data.order_status.join(',');
      const current_page = parseInt(response.data.current_page);
      // array to string for filter
      setData(prev => {
        const mainOrders = response.data.data;
        const { totalQuantity, count } = response.data.statistics;
        if (!mainOrders || mainOrders.length === 0) return {
          ...prev,
          data: [],
          totalQuantity: totalQuantity,
          count: count,
          hasMore: false,
        }
        return {
          data: current_page === 1 ? mainOrders : [...prev.data, ...mainOrders],
          totalQuantity: totalQuantity,
          nextPage: current_page + 1,
          hasMore: true,
          count: count
        }
      });
      setFilter(prev => {
        return {
          ...prev,
          order_status: order_status
        }
      })
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
    <OrderContext.Provider value={{ data, nextPage, count, totalQuantity, hasMore, ButtonInstance, fetchData, removeOrder, order_status, filter, handleFilterChange }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;