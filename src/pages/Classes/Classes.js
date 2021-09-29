import React, { useState, useEffect, useMemo } from 'react'

import getClassesService from '../../services/classes/get-classes'

import { COLUMNS } from '../../components/Table/classes/columns'

import Table from '../../components/Table/Table'

const Classes = props => {

  const token = localStorage.getItem('app-token')
  const [classData, setClassData] = useState([])

  useEffect(() => {
    getClassesService(token, { classType: '', title: '' }, setClassData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="classes-container">
      <h1>Listagem de aulas</h1>
      <h2>Bem vindo!</h2>
      <Table data={classData} columns={columns} />
    </div>
  )
}

export default Classes
