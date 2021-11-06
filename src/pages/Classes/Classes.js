import './Classes.css'

import React, { useState, useEffect, useMemo } from 'react'

import getClassesService from '../../services/classes/get-classes'

import { COLUMNS } from '../../components/Table/classes/columns'

import Table from '../../components/Table/Table'

import { useAuth } from '../../providers/auth'
import { useHistory } from 'react-router'

const hasAccess = (userType, route) => {
  if (userType === 'TEACHER') {
    switch (route) {
      case '/usuarios':
        return false
      case '/medalhas/cadastrar':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (route) {
      case '/usuarios':
        return false
      case '/questionarios':
        return false
      case '/aulas/cadastrar':
        return false
      case '/medalhas/cadastrar':
        return false
      default:
        return true
    }
  }
  return true
}

const Classes = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const authUserData = useAuth().userData

  const [classData, setClassData] = useState([])

  const getClassesData = async () => {
    const classesData = await getClassesService(token, { classType: '', title: '' })
    setClassData(classesData)
  }

  useEffect(() => {
    getClassesData()
  }, [])

  const columns = useMemo(() => COLUMNS(historyContext, token, getClassesData, authUserData.userType), [])

  return (
    <div className="classes-container">
      <h1>Listagem de aulas</h1>
      <h2>Bem vindo!</h2>
      <div className="classes-content-container">
        <button className={hasAccess(authUserData.userType, "/aulas/cadastrar") ? "class-register-button-show" : "class-register-button-hide"} onClick={() => {
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
