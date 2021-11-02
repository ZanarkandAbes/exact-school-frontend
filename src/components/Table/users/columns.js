import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import deleteUserService from '../../../services/users/delete-user'

const hasPermission = (userType, permission) => {
  if (userType === 'TEACHER') {
    switch (permission) {
      case 'users-view':
        return false
      case 'users-create':
        return false
      case 'users-update':
        return false
      case 'users-delete':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (permission) {
      case 'users-view':
        return false
      case 'users-create':
        return false
      case 'users-update':
        return false
      case 'users-delete':
        return false
      default:
        return true
    }
  }
  return true
}

export const COLUMNS = (history, token, getUsersData, userType) => {
  const columns = [
    {
      Header: 'E-mail',
      accessor: 'email',
      Filter: ColumnFilter
    },
    {
      Header: 'Nome',
      accessor: 'name',
      Filter: ColumnFilter
    },
    {
      Header: 'Tipo de Usuário',
      accessor: 'userType',
      Filter: ColumnFilter
    },
    {
      Header: 'Total de Moedas',
      accessor: 'totalCoins',
      Filter: ColumnFilter
    },
    {
      Header: 'Data de Nascimento',
      accessor: 'birthDay',
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/MM/yyyy')
      },
      Filter: ColumnFilter
    }
  ]

  if (hasPermission(userType, 'users-view')) {
    columns.push({
      Header: 'Visualizar',
      Cell: ({ cell }) => (
        <button value="view-user-button" onClick={e => console.log('OIE')}>
          Visualizar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'users-update')) {
    columns.push({
      Header: 'Editar',
      Cell: ({ cell }) => (
        <button value="update-user-button" onClick={e => {
          history.push(`/usuarios/atualizar/${cell.row.original._id}`)
        }}>
          Editar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'users-delete')) {
    columns.push({
      Header: 'Excluir',
      Cell: ({ cell }) => (
        <button value="delete-user-button" onClick={e => {
          confirmAlert({
            title: 'Excluir',
            message: 'Você tem certeza de que quer excluir esse usuário?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  await deleteUserService(token, cell.row.original._id)
                  getUsersData()
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