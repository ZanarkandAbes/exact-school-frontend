import './Users.css'

import React, { useState, useEffect, useMemo } from 'react'

import getUsersService from '../../services/users/get-users'

import { COLUMNS } from '../../components/Table/users/columns'

import Table from '../../components/Table/Table'

import { useAuth } from '../../providers/auth'
import { useHistory } from 'react-router'

const Users = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const authUserData = useAuth().userData

  const [userData, setUserData] = useState([])

  const getUsersData = async () => {
    const usersData = await getUsersService(token, { name: '', email: '' })
    setUserData(usersData)
  }

  useEffect(() => {
    getUsersData()
  }, [])

  const columns = useMemo(() => COLUMNS(historyContext, token, getUsersData, authUserData.userType), [historyContext, token])

  console.log('authUserData', authUserData)

  return (
    <div className="users-container">
      <h1>Listagem de usuários</h1>
      <h2>Bem vindo!</h2>
      <div className="users-content-container">
        <button className="user-register-button" onClick={() => {
          historyContext.push('/usuarios/cadastrar')
        }}>
          Cadastrar Usuário
        </button>
      </div>
      <Table data={userData} columns={columns} />
    </div>
  )
}

export default Users
