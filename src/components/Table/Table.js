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
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter, pageIndex, pageSize } = state

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
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</button>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [5, 10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))
          }
        </select>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <span>
          Vá para a página: {' '}
          <input
            className="goto-page-input"
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
          />
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Próxima</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
    </>
  )
}

export default Table