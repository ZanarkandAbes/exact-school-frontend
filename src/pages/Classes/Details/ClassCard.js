import './ClassCard.css'
import React, { useEffect, useState } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import Quiz from '../../../components/Quiz/Quiz'

import getUserService from '../../../services/users/get-user'

import { useAuth } from '../../../providers/auth'

const ClassCard = ({ classData }) => {

  const { token } = useAuth()

  const userDataToGet = useAuth().userData

  const [userData, setUserData] = useState({})

  const getUserData = async () => {
    const userData = await getUserService(token, userDataToGet._id)
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (!userData.badges) return 'Carregando...'

  return (
    <div>
      <div className="class-video-information-container">
        <Card style={{ width: '100%', height: '100%', marginBottom: '32px' }}>
          <CardHeader
            title={`${classData.title}`}
            subheader={`Informações`}
          />
          <CardContent className="class-video-card-container-content">
            <iframe title={classData.title} src={classData.videoUrl} className="class-video-iframe" ></iframe>
          </CardContent>
        </Card>
      </div>
      {classData.quizzes.length !== 0 ? <Quiz quizzes={classData.quizzes} token={token} userData={userData} /> : null}
    </div>
  )
}

export default ClassCard