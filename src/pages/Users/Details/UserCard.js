import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import { IconButton, Typography } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'

import { format } from 'date-fns'

const UserCard = ({ userData }) => {

  console.log('userData dentro do card:', userData)

  return (
    <div>
      {`E-mail: ${userData.email}`}
      {`Data de Nascimento: ${format(new Date(userData.birthDay), 'dd/MM/yyyy')}`}
      {`Tipo de Usuário: ${userData.userType}`}
      {`Medalhas: ${userData.badges.map(badge => badge.name)}`}
      {`Moedas: ${userData.totalCoins.toFixed(2)}`}
      {/* <Card>
        <CardHeader
          action={
            <IconButton>
              <DeleteOutlined />
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
            {`Medalhas: ${userData.badges.map(badge => badge.name)}`}
          </Typography>
          <Typography>
            {`Moedas: ${userData.totalCoins.toFixed(2)}`}
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  )
}

export default UserCard