import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import { IconButton, Typography } from '@material-ui/core'
import { MoneyOutlined } from '@material-ui/icons'

const QuizCard = ({ quizData }) => {

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={e => console.log('aaaa')} >
              <MoneyOutlined />
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
            {`Resposta: ${quizData.answer}`}
          </Typography>
          <Typography>
            {`Moedas de Recompensa: ${quizData.coins.toFixed(2)}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizCard