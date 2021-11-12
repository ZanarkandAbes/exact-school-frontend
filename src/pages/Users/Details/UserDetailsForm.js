import './UserDetailsForm.css'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import getUserService from '../../../services/users/get-user'

import UserCard from './UserCard'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'

const UserDetailsForm = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const [userData, setUserData] = useState({})

  const paramsContext = useParams()

  const getUserData = async () => {
    const userData = await getUserService(token, paramsContext.id)
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (!userData.badges) return 'Carregando...'

  return (
    <div className="user-card-container">
      <UserCard userData={userData} />
      <div className="user-card-button-container">
        <button className="user-view-button-back" type="button" onClick={() => {
          historyContext.push('/usuarios')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default UserDetailsForm