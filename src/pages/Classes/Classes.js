import './Classes.css'

import React, { useState, useEffect, useMemo } from 'react'

import getClassesService from '../../services/classes/get-classes'

import { COLUMNS } from '../../components/Table/classes/columns'

import Table from '../../components/Table/Table'

import { useAuth } from '../../providers/auth'
import { useHistory } from 'react-router'

const Classes = props => {

  const historyContext = useHistory()

  const { token } = useAuth()
  const [classData, setClassData] = useState([])

  const getClassesData = async () => {
    const classesData = await getClassesService(token, { classType: '', title: '' })
    setClassData(classesData)
  }

  useEffect(() => {
    getClassesData()
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="classes-container">
      <h1>Listagem de aulas</h1>
      <h2>Bem vindo!</h2>
      <div className="classes-content-container">
        <button className="class-register-button" onClick={() => {
          historyContext.push('/aulas/cadastrar')
        }}>
          Cadastrar Aula
        </button>
      </div>
      <Table data={classData} columns={columns} />
    </div>
  )
}

export default Classes
