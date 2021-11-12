import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import deleteTopicService from '../../../services/topics/delete-topic'

const hasPermission = (userType, permission) => {
  if (userType === 'TEACHER') {
    switch (permission) {
      case 'topics-update':
        return false
      case 'topics-delete':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (permission) {
      case 'topics-update':
        return false
      case 'topics-delete':
        return false
      default:
        return true
    }
  }
  return true
}

export const COLUMNS = (history, token, getTopicsData, userType) => {
  const columns = [
    {
      Header: 'Título',
      accessor: 'title',
      Filter: ColumnFilter
    },
    {
      Header: 'Descrição',
      accessor: 'description',
      Filter: ColumnFilter
    },
    {
      Header: 'Tags',
      accessor: 'tags',
      Cell: ({ value }) => {

        const tagsToShow = value.map(tag => tag + ';')

        return tagsToShow
      },
      Filter: ColumnFilter,
    },
    {
      Header: 'Tipo do Tópico',
      accessor: 'topicType',
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

  if (hasPermission(userType, 'topics-view')) {
    columns.push({
      Header: 'Visualizar',
      Cell: ({ cell }) => (
        <button value="view-topic-button" onClick={e => {
          history.push(`/topicos/visualizar/${cell.row.original._id}`)
        }}>
          Visualizar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'topics-update')) {
    columns.push({
      Header: 'Editar',
      Cell: ({ cell }) => (
        <button value="update-topic-button" onClick={e => {
          history.push(`/topicos/atualizar/${cell.row.original._id}`)
        }}>
          Editar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'topics-delete')) {
    columns.push({
      Header: 'Excluir',
      Cell: ({ cell }) => (
        <button value="delete-topic-button" onClick={e => {
          confirmAlert({
            title: 'Excluir',
            message: 'Você tem certeza de que quer excluir esse tópico?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  await deleteTopicService(token, cell.row.original._id)
                  getTopicsData()
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