import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

export const COLUMNS = [
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
  },
  {
    Header: 'Visualizar',
    Cell: ({ cell }) => (
      <button value="teste" onClick={e => console.log('OIE')}>
        Visualizar
      </button>
    ),
  },
  {
    Header: 'Editar',
    Cell: ({ cell }) => (
      <button value="teste" onClick={e => console.log('KKKKKKKK')}>
        Editar
      </button>
    ),
  },
  {
    Header: 'Excluir',
    Cell: ({ cell }) => (
      <button value="teste" onClick={e => console.log('JJJJJJJ')}>
        Excluir
      </button>
    ),
  }
]