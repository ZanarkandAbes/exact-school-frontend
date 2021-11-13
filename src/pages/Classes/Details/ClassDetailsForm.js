import './ClassDetailsForm.css'
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import getClassService from '../../../services/classes/get-class'

import ClassCard from './ClassCard'

import { useHistory } from 'react-router'
import { useAuth } from '../../../providers/auth'

const ClassDetailsForm = props => {

  const historyContext = useHistory()

  const { token } = useAuth()

  const [classData, setClassData] = useState({})

  const paramsContext = useParams()

  const getClassData = async () => {
    const classData = await getClassService(token, paramsContext.id)
    setClassData(classData)
  }

  useEffect(() => {
    getClassData()
  }, [])

  if (!classData.quizzes) return 'Carregando...'
  
  return (
    <div className="class-card-container">
      <ClassCard classData={classData} />
      <div className="class-card-button-container">
        <button className="class-view-button-back" type="button" onClick={() => {
          historyContext.push('/aulas')
        }}>
          Voltar
        </button>
      </div>
    </div>
  )
}

export default ClassDetailsForm