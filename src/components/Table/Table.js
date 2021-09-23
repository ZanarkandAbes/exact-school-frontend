import './Table.css'
import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'

import getUsersService from '../../services/users/get-users'

import { COLUMNS } from './users/columns'

const Table = () => {

  const token = localStorage.getItem('app-token')
  const [data, setData] = useState([])

  useEffect(() => {
    getUsersService(token, { name: '', email: '' }, setData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  const tableInstance = useTable({
    columns: columns,
    data: data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <table {...getTableProps()} className="user-list-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default Table