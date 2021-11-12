import './BadgeDetailsForm.css'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import getBadgeService from '../../../services/badges/get-badge'

import BadgeCard from './BadgeCard'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'

const BadgeDetailsForm = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const [badgeData, setBadgeData] = useState({})

  const paramsContext = useParams()

  const getBadgeData = async () => {
    const badgeData = await getBadgeService(token, paramsContext.id)
    setBadgeData(badgeData)
  }
  
  useEffect(() => {
    getBadgeData()
  }, [])

  if (!badgeData.name) return 'Carregando...'

  return (
    <div className="badge-card-container">
      <BadgeCard badgeData={badgeData} />
      <div className="badge-card-button-container">
        <button className="badge-view-button-back" type="button" onClick={() => {
          historyContext.push('/medalhas')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default BadgeDetailsForm