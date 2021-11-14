import React, { useEffect, useState } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import getUserService from '../../../services/users/get-user'

import { IconButton, Typography } from '@material-ui/core'
import { TextFieldsOutlined } from '@material-ui/icons'

import { useAuth } from '../../../providers/auth'

const TopicCard = ({ topicData }) => {

  const { token } = useAuth()

  const [userData, setUserData] = useState({})

  const getUserData = async () => {
    const userData = await getUserService(token, topicData.userId)
    setUserData(userData)
  }
  
  useEffect(() => {
    getUserData()
  }, [])

  if (!userData.badges) return 'Carregando...'

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <TextFieldsOutlined />
            </IconButton>
          }
          title={`Dados do Tópico ${topicData.title}`}
          subheader={`Informações`}
        />
        <CardContent>
          <Typography>
            {`Criado por: ${userData.name}`}
          </Typography>
          <Typography>
            {`${topicData.description}`}
          </Typography>
          <Typography>
            {`Tipo de Tópico: ${topicData.topicType}`}
          </Typography>
          <Typography>
            {`Tags: ${topicData.tags.map(tag => tag + ';')}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default TopicCard