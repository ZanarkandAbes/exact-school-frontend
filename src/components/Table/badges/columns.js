import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import deleteBadgeService from '../../../services/badges/delete-badge'

const hasPermission = (userType, permission) => {
  if (userType === 'TEACHER') {
    switch (permission) {
      case 'badges-update':
        return false
      case 'badges-delete':
        return false
      default:
        return true
    }
  } else if (userType === 'STUDENT') {
    switch (permission) {
      case 'badges-update':
        return false
      case 'badges-delete':
        return false
      default:
        return true
    }
  }
  return true
}

export const COLUMNS = (history, token, getBadgesData, userType) => {
  const columns = [
    {
      Header: 'Nome',
      accessor: 'name',
      Filter: ColumnFilter
    },
    {
      Header: 'Preço',
      accessor: 'price',
      Filter: ColumnFilter
    },
    {
      Header: 'Tipo de Medalha',
      accessor: 'badgeType',
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

  if (hasPermission(userType, 'badges-view')) {
    columns.push({
      Header: 'Visualizar',
      Cell: ({ cell }) => (
        <button value="view-badge-button" onClick={e => {
          history.push(`/medalhas/visualizar/${cell.row.original._id}`)
        }}>
          Visualizar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'badges-update')) {
    columns.push({
      Header: 'Editar',
      Cell: ({ cell }) => (
        <button value="update-badge-button" onClick={e => {
          history.push(`/medalhas/atualizar/${cell.row.original._id}`)
        }}>
          Editar
        </button>
      )
    })
  }

  if (hasPermission(userType, 'badges-delete')) {
    columns.push({
      Header: 'Excluir',
      Cell: ({ cell }) => (
        <button value="delete-badge-button" onClick={e => {
          confirmAlert({
            title: 'Excluir',
            message: 'Você tem certeza de que quer excluir essa medalha?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  await deleteBadgeService(token, cell.row.original._id)
                  getBadgesData()
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