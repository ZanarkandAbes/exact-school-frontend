import './Badges.css'

import React, { useState, useEffect, useMemo } from 'react'

import getBadgesService from '../../services/badges/get-badges'

import { COLUMNS } from '../../components/Table/badges/columns'

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
      case '/medalhas/cadastrar':
        return false
      default:
        return true
    }
  }
  return true
}

const Badges = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const authUserData = useAuth().userData

  const [badgeData, setBadgeData] = useState([])

  const getBadgesData = async () => {
    const badgesData = await getBadgesService(token, { badgeType: '', name: '' })
    setBadgeData(badgesData)
  }

  useEffect(() => {
    getBadgesData()
  }, [])

  const columns = useMemo(() => COLUMNS(historyContext, token, getBadgesData, authUserData.userType), [])

  return (
    <div className="badges-container">
      <h1>Listagem de medalhas</h1>
      <h2>Bem vindo!</h2>
      <div className="badges-content-container">
        <button className={hasAccess(authUserData.userType, "/medalhas/cadastrar") ? "badge-register-button-show" : "badge-register-button-hide"} onClick={() => {
          historyContext.push('/medalhas/cadastrar')
        }}>
          Cadastrar Medalha
        </button>
      </div>
      <Table data={badgeData} columns={columns} />
    </div>
  )
}

export default Badges
