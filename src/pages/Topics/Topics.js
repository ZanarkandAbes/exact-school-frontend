import React, { useState, useEffect, useMemo } from 'react'

import getTopicsService from '../../services/topics/get-topics'

import { COLUMNS } from '../../components/Table/topics/columns'

import Table from '../../components/Table/Table'

const Topics = props => {

  const token = localStorage.getItem('app-token')
  const [topicData, setTopicData] = useState([])

  useEffect(() => {
    getTopicsService(token, { topicType: '', title: '' }, setTopicData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="topics-container">
      <h1>Listagem de tópicos</h1>
      <h2>Bem vindo!</h2>
      <Table data={topicData} columns={columns} />
    </div>
  )
}

export default Topics
