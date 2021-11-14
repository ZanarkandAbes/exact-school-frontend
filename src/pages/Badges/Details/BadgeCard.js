import './BadgeCard.css'
import React, { useEffect, useState } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import getUserService from '../../../services/users/get-user'
import buyBadgeService from '../../../services/users/buy-badge'

import { IconButton, Typography } from '@material-ui/core'
import { MoneyOutlined } from '@material-ui/icons'

import { useAuth } from '../../../providers/auth'
import { useToasts } from 'react-toast-notifications'

import successMessagesEnum from '../../../common/enums/successMessages'
import errorMessagesEnum from '../../../common/enums/errorMessages'

const BadgeCard = ({ badgeData }) => {

  const { token } = useAuth()

  const userDataContext = useAuth().userData

  const toastContext = useToasts()

  const [userData, setUserData] = useState({})

  const getUserData = async () => {
    const userDataToGet = await getUserService(token, userDataContext._id)
    setUserData(userDataToGet)
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (!userData.badges) return 'Carregando...'

  return (
    <div>
      <div className="user-coins-card-container">
        <Card>
          <CardHeader
            title={`Você tem ${userData.totalCoins.toLocaleString()} moedas`}
          />
        </Card>
      </div>
      <div className="badge-information-card-container">
        <Card>
          <CardHeader
            action={
              <IconButton onClick={() => {
                const values = {
                  badgeId: badgeData._id
                }
                buyBadgeService(token, values, userDataContext._id).then(data => {
                  if (data) {
                    toastContext.addToast(successMessagesEnum.BUY_BADGE, { appearance: 'success', autoDismiss: true })
                  } else {
                    toastContext.addToast(errorMessagesEnum.BUY_BADGE, { appearance: 'error', autoDismiss: true })
                  }
                })
              }} >
                <p>Comprar</p>
                <MoneyOutlined />
              </IconButton>
            }
            title={`${badgeData.name}`}
            subheader={`Informações`}
          />
          <CardContent>
            <Typography>
              {`Preço: ${badgeData.price.toLocaleString()}`}
            </Typography>
            <Typography>
              {`Tipo de Medalha: ${badgeData.badgeType}`}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BadgeCard