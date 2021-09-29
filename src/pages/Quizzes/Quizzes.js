import React, { useState, useEffect, useMemo } from 'react'

import getQuizzesService from '../../services/quizzes/get-quizzes'

import { COLUMNS } from '../../components/Table/quizzes/columns'

import Table from '../../components/Table/Table'

const Quizzes = props => {

  const token = localStorage.getItem('app-token')
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    getQuizzesService(token, { quizType: '', description: '' }, setQuizData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="quizzes-container">
      <h1>Listagem de perguntas</h1>
      <h2>Bem vindo!</h2>
      <Table data={quizData} columns={columns} />
    </div>
  )
}

export default Quizzes
