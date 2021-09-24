import './Table.css'
import React from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'

import Filter from './filters/Filter'

const Table = props => {

  const tableInstance = useTable({
    columns: props.columns,
    data: props.data
  }, useGlobalFilter, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter } = state

  return (
    <>
    <Filter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()} className="list-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? '⬇️' : '⬆️') : ''}
                </span>
              </th>
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
    </>
  )
}

export default Table