import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import deleteClassService from '../../../services/classes/delete-class'

const hasPermission = (userType, permission) => {
  if (userType === 'TEACHER') {
    switch (permission) {
      case 'classes-delete':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (permission) {
      case 'classes-update':
        return false
      case 'classes-delete':
        return false
      default:
        return true
    }
  }
  return true
}

export const COLUMNS = (history, token, getClassesData, userType) => {
  const columns = [
    {
      Header: 'Título',
      accessor: 'title',
      Filter: ColumnFilter
    },
    {
      Header: 'Tipo da Aula',
      accessor: 'classType',
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

  if (hasPermission(userType, 'classes-view')) {
    columns.push({
      Header: 'Visualizar',
      Cell: ({ cell }) => (
        <button value="view-class-button" onClick={e => console.log('OIE')}>
          Visualizar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'classes-update')) {
    columns.push({
      Header: 'Editar',
      Cell: ({ cell }) => (
        <button value="update-class-button" onClick={e => {
          history.push(`/aulas/atualizar/${cell.row.original._id}`)
        }}>
          Editar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'classes-delete')) {
    columns.push({
      Header: 'Excluir',
      Cell: ({ cell }) => (
        <button value="delete-topic-button" onClick={e => {
          confirmAlert({
            title: 'Excluir',
            message: 'Você tem certeza de que quer excluir essa aula?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  await deleteClassService(token, cell.row.original._id)
                  getClassesData()
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