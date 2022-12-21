import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../components/Spinner/Spinner';
import MainOrder from '../../components/Order/MainOrder';
import useOrder from '../../hooks/useOrder';

export default function PageHome() {
  const { data, fetchData, hasMore } = useOrder();

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>"Bitti"</b>
        </p>
      }
      style={{ overflow: "hidden" }}
      loader={<Spinner className="px-8 py-1 w-24 m-auto" />}
    >
      <div className="d-flex flex-column bg-light gap-2 mt-2 mx-2 align-items-center">
        {data.map((mainOrder, index) => {
          if (mainOrder.orders.length === 0) return null;
          return <MainOrder mainOrder={mainOrder} key={mainOrder._id} />
        })}
      </div>
    </InfiniteScroll>
  )
}
