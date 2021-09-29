import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

export const COLUMNS = [
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
    accessor: 'answer',
    Filter: ColumnFilter
  },
  {
    Header: 'Recompensa Em Moedas',
    accessor: 'coins',
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