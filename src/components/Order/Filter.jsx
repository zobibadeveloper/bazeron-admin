import React, { useEffect, useState } from 'react'
import orderStatuses from '../../constants/status';
import useOrder from '../../hooks/useOrder';
import { getCities } from '../../constants/cities';

export default function Filter() {
  const { order_status, fetchData, filter, handleFilterChange } = useOrder();
  const cities = getCities();

  return (
    <form className='container'>
      <div className="row gap-2 mx-2 mt-2">
        <select name='order_status' value={filter.order_status} onChange={handleFilterChange} className="col form-select col bg-light form-select-sm" aria-label=".form-select-sm example">
          {Object.values(orderStatuses).map((status, index) => {
            return <option className='bg-light' value={status.id} key={index}>{status.name}</option>
          })}
        </select>
        <select name='city_id' value={filter.city_id} onChange={handleFilterChange} className="col form-select col bg-light form-select-sm" aria-label=".form-select-sm example">
            <option className='bg-light' value='all'>Tümü</option>
            {cities.map((city, index) => {
              return <option className='bg-light' value={city.id} key={city.id}>{city.name_tr}</option>
            })}
        </select>
      </div>
    </form>
  )
}
