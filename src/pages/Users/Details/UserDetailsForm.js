import './UserDetailsForm.css'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import getUserService from '../../../services/users/get-user'

import UserCard from './UserCard'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

const UserDetailsForm = props => {

  const historyContext = useHistory()
  const toastContext = useToasts()

  const { token } = useAuth()

  const [userData, setUserData] = useState({})

  const paramsContext = useParams()

  const getUserData = async () => {
    let unmounted = false
    const userData = await getUserService(token, paramsContext.id)
    setTimeout(() => {
      if (!unmounted) {
        setUserData(userData)
      }
    })
    return () => {
      unmounted = true
    }
  }

  let badges = ''

  const formatBadges = async () => {

    if (!!userData.badges) {
      await userData.badges.map(badge => {

        if (badges === '') {
          badges = badge.name
        } else {
          badges = badges + ';' + badge.name
        }

        return badge
      })
    }
  }

  useEffect(() => {
    getUserData()
    formatBadges()
  }, [])

  console.log('userData', userData)

  return (
    <div>
      <UserCard userData={userData} />
    </div>
  )
}

export default UserDetailsForm