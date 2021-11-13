import './QuizDetailsForm.css'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import getQuizService from '../../../services/quizzes/get-quiz'

import QuizCard from './QuizCard'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'

const QuizDetailsForm = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const [quizData, setQuizData] = useState({})

  const paramsContext = useParams()

  const getQuizData = async () => {
    const quizData = await getQuizService(token, paramsContext.id)
    setQuizData(quizData)
  }

  useEffect(() => {
    getQuizData()
  }, [])

  if (!quizData.description) return 'Carregando...'

  return (
    <div className="quiz-card-container">
      <QuizCard quizData={quizData} />
      <div className="quiz-card-button-container">
        <button className="quiz-view-button-back" type="button" onClick={() => {
          historyContext.push('/questionarios')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default QuizDetailsForm