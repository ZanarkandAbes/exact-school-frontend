import React, { useState, useEffect, useMemo } from 'react'

import getBadgesService from '../../services/badges/get-badges'

import { COLUMNS } from '../../components/Table/badges/columns'

import Table from '../../components/Table/Table'

const Badges = props => {

  const token = localStorage.getItem('app-token')
  const [badgeData, setBadgeData] = useState([])

  useEffect(() => {
    getBadgesService(token, { badgeType: '', name: '' }, setBadgeData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="badges-container">
      <h1>Listagem de medalhas</h1>
      <h2>Bem vindo!</h2>
      <Table data={badgeData} columns={columns} />
    </div>
  )
}

export default Badges
