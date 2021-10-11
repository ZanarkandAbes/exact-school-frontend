import './Quizzes.css'

import React, { useState, useEffect, useMemo } from 'react'

import getQuizzesService from '../../services/quizzes/get-quizzes'

import { COLUMNS } from '../../components/Table/quizzes/columns'

import Table from '../../components/Table/Table'

import { useAuth } from '../../providers/auth'
import { useHistory } from 'react-router'

const Quizzes = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    getQuizzesService(token, { quizType: '', description: '' }, setQuizData)
  }, [])

  const columns = useMemo(() => COLUMNS, [])

  return (
    <div className="quizzes-container">
      <h1>Listagem de perguntas</h1>
      <h2>Bem vindo!</h2>
      <div className="quizzes-content-container">
        <button className="quiz-register-button" onClick={() => {
          historyContext.push('/questionarios/cadastrar')
        }}>
          Cadastrar Questionário
        </button>
      </div>
      <Table data={quizData} columns={columns} />
    </div>
  )
}

export default Quizzes
