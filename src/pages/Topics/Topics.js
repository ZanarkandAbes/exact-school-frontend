import './Topics.css'

import React, { useState, useEffect, useMemo } from 'react'

import getTopicsService from '../../services/topics/get-topics'

import { COLUMNS } from '../../components/Table/topics/columns'

import Table from '../../components/Table/Table'

import { useAuth } from '../../providers/auth'
import { useHistory } from 'react-router'

const Topics = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const authUserData = useAuth().userData
  
  const [topicData, setTopicData] = useState([])

  const getTopicsData = async () => {
    const topicsData = await getTopicsService(token, { topicType: '', title: '' })
    setTopicData(topicsData)
  }

  useEffect(() => {
    getTopicsData()
  }, [])

  const columns = useMemo(() => COLUMNS(historyContext, token, getTopicsData, authUserData.userType), [])

  return (
    <div className="topics-container">
      <h1>Listagem de tópicos</h1>
      <h2>Bem vindo!</h2>
      <div className="topics-content-container">
        <button className="topic-register-button" onClick={() => {
          historyContext.push('/topicos/cadastrar')
        }}>
          Cadastrar Tópico
        </button>
      </div>
      <Table data={topicData} columns={columns} />
    </div>
  )
}

export default Topics
