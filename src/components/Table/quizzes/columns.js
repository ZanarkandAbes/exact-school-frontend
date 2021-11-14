import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import deleteQuizService from '../../../services/quizzes/delete-quiz'

const hasPermission = (userType, permission) => {
  if (userType === 'TEACHER') {
    switch (permission) {
      case 'quizzes-delete':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (permission) {
      case 'quizzes-create':
        return false
      case 'quizzes-update':
        return false
      case 'quizzes-delete':
        return false
      default:
        return true
    }
  }
  return true
}

export const COLUMNS = (history, token, getQuizzesData, userType) => {
  const columns = [
    {
      Header: 'Descrição',
      accessor: 'description',
      Filter: ColumnFilter
    },
    {
      Header: 'Tipo de Pergunta',
      accessor: 'questionType',
      Filter: ColumnFilter
    },
    {
      Header: 'Resposta',
      accessor: 'answerOptions',
      Cell: ({ value }) => {
        const answerValue = value.map(answer => answer.isCorrect ? answer.answerText : '')
        return answerValue
      },
      Filter: ColumnFilter
    },
    {
      Header: 'Recompensa Em Moedas',
      accessor: 'coins',
      Cell: ({ value }) => {
        return value.toLocaleString()
      },
      Filter: ColumnFilter
    },
    {
      Header: 'Data de Criação',
      accessor: 'createdAt',
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/MM/yyyy')
      },
      Filter: ColumnFilter
    }
  ]

  if (hasPermission(userType, 'quizzes-view')) {
    columns.push({
      Header: 'Visualizar',
      Cell: ({ cell }) => (
        <button value="view-quiz-button" onClick={e => {
          history.push(`/questionarios/visualizar/${cell.row.original._id}`)
        }}>
          Visualizar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'quizzes-update')) {
    columns.push({
      Header: 'Editar',
      Cell: ({ cell }) => (
        <button value="update-quiz-button" onClick={e => {
          history.push(`/questionarios/atualizar/${cell.row.original._id}`)
        }}>
          Editar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'quizzes-delete')) {
    columns.push({
      Header: 'Excluir',
      Cell: ({ cell }) => (
        <button value="delete-quiz-button" onClick={e => {
          confirmAlert({
            title: 'Excluir',
            message: 'Você tem certeza de que quer excluir essa pergunta?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  await deleteQuizService(token, cell.row.original._id)
                  getQuizzesData()
                }
              },
              {
                label: 'Não',
                onClick: () => { }
              }
            ]
          })
        }}>
          Excluir
        </button>
      )
    })
  }

  return columns
}