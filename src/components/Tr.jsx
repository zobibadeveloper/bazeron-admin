import React from 'react'

export default function Tr({ title, value }) {
  return (
    <tr>
      <th style={{ width: "60px" }}>{title}</th>
      <td style={{ width: "1px" }}>:</td>
      <td>{value}</td>
    </tr>
  )
}
