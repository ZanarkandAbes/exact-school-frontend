import './Users.css'

import React, { useState, useEffect, useMemo } from 'react'

import getUsersService from '../../services/users/get-users'

import { COLUMNS } from '../../components/Table/users/columns'

import Table from '../../components/Table/Table'

import { history } from '../../history'
import UserRegisterForm from './Register'

const Users = props => {

  const token = localStorage.getItem('app-token')
  const [userData, setUserData] = useState([])

  useEffect(() => {
    getUsersService(token, { name: '', email: '' }, setUserData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="users-container">
      <h1>Listagem de usuários</h1>
      <h2>Bem vindo!</h2>
      <div className="users-content-container">
        <button className="user-register-button" onClick={() => {
          history.push('/usuarios/cadastrar')
        }}>
          Cadastrar Usuário
        </button>
      </div>
      <Table data={userData} columns={columns} />
    </div>
  )
}

export default Users
