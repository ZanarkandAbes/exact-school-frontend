import './Table.css'
import React from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'

import Filter from './filters/Filter'

const Table = props => {

  const tableInstance = useTable({
    columns: props.columns,
    data: props.data
  }, useFilters, useGlobalFilter, useSortBy, usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter, pageIndex } = state

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
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
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
            page.map(row => {
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
      <div className="pagination-buttons-container">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</button>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Próxima</button>
      </div>
    </>
  )
}

export default Table