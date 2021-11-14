import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import { IconButton, Typography } from '@material-ui/core'
import { QuestionAnswerOutlined } from '@material-ui/icons'

const QuizCard = ({ quizData }) => {

  const correctAnswer = quizData.answerOptions.map(answer => answer.isCorrect ? answer.answerText : '')

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <QuestionAnswerOutlined />
            </IconButton>
          }
          title={`Dados da Pergunta`}
          subheader={`Informações`}
        />
        <CardContent>
          <Typography>
            {`Descrição: ${quizData.description}`}
          </Typography>
          <Typography>
            {`Tipo de Pergunta: ${quizData.questionType}`}
          </Typography>
          <Typography>
            {`Resposta: ${correctAnswer.filter(answer => answer !== "")}`}
          </Typography>
          <Typography>
            {`Moedas de Recompensa: ${quizData.coins.toLocaleString()}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizCard