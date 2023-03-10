import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../components/Spinner/Spinner';
import MainOrder from '../../components/Order/MainOrder';
import useOrder from '../../hooks/useOrder';
import Filter from '../../components/Order/Filter';

export default function PageHome() {
  const { data, fetchData, hasMore, count, totalQuantity } = useOrder();

  return (
    <>
      <Filter />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={data.length !== count && hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>"Bitti"</b>
          </p>
        }
        style={{ overflow: "hidden" }}
        loader={<Spinner className="px-8 py-1 w-24 m-auto" />}
      >
        <div className="d-flex flex-column bg-light gap-2 mt-2 mx-2 align-items-center">
          <p className='my-0 p-1'>Toplam Adet: {totalQuantity}</p>
          {data.map((mainOrder, index) => {
            if (mainOrder.orders.length === 0) return null;
            return <MainOrder mainOrder={mainOrder} key={mainOrder._id} />
          })}
        </div>
      </InfiniteScroll>
    </>
  )
}
