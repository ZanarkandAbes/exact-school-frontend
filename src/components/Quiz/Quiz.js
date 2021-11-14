import './Quiz.css'
import React, { useState } from 'react'
import updateUserService from '../../services/users/update-user'

const Quiz = ({ quizzes, token, userData }) => {

  const questions = quizzes

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
      setCoins(coins + quizzes[currentQuestion].coins)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const updateUserTotalCoins = async () => {
    if (!!coins) userData.totalCoins = userData.totalCoins + coins

    let values = userData

    await updateUserService(token, userData._id, values)
  }

  if (showScore) {
    updateUserTotalCoins()
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          Você acertou {score} de {questions.length} e ganhou {coins.toLocaleString()} moedas
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