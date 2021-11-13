import './Quiz.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Quiz = ({ quizzes }) => {

  // const [questions, setQuestions] = useState([])

  const historyContext = useHistory()

  const questions = [
    {
      description: 'Quanto é 1 + 1?',
      answerOptions: [
        { answerText: '2', isCorrect: true },
        { answerText: '3', isCorrect: false },
        { answerText: '1', isCorrect: false },
        { answerText: '12', isCorrect: false }
      ]
    }
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          Você acertou {score} de {questions.length} e ganhou {0} moedas
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].description}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button className="quiz-button" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz