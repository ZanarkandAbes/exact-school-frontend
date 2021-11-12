import './TopicDetailsForm.css'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import getTopicService from '../../../services/topics/get-topic'

import TopicCard from './TopicCard'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'

const TopicDetailsForm = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const [topicData, setTopicData] = useState({})

  const paramsContext = useParams()

  const getTopicData = async () => {
    const topicData = await getTopicService(token, paramsContext.id)
    setTopicData(topicData)
  }

  useEffect(() => {
    getTopicData()
  }, [])

  if (!topicData.topicAnswers) return 'Carregando...'
  
  return (
    <div className="topic-card-container">
      <TopicCard topicData={topicData} />
      <div className="topic-card-button-container">
        <button className="topic-view-button-back" type="button" onClick={() => {
          historyContext.push('/topicos')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default TopicDetailsForm