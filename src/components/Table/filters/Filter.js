import './Filter.css'
import React from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <span className="filter-container">
      Buscar: {''}
      <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}

export default Filter