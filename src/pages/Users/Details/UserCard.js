import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import { IconButton, Typography } from '@material-ui/core'
import { VerifiedUserOutlined } from '@material-ui/icons'

import { format } from 'date-fns'

const UserCard = ({ userData }) => {

  let badges = ''

  userData.badges.map(badge => {

    if (badges === '') {
      badges = badge.name
    } else {
      badges = badges + ';' + badge.name
    }

    return badge
  })

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <VerifiedUserOutlined />
            </IconButton>
          }
          title={`Dados do Usuário ${userData.name}`}
          subheader={`Informações`}
        />
        <CardContent>
          <Typography>
            {`E-mail: ${userData.email}`}
          </Typography>
          <Typography>
            {`Data de Nascimento: ${format(new Date(userData.birthDay), 'dd/MM/yyyy')}`}
          </Typography>
          <Typography>
            {`Tipo de Usuário: ${userData.userType}`}
          </Typography>
          <Typography>
            {`Medalhas: ${badges}`}
          </Typography>
          <Typography>
            {`Moedas: ${userData.totalCoins.toLocaleString()}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserCard