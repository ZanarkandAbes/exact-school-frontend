import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

export const COLUMNS = [
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
  },
  {
    Header: 'Editar',
    Cell: ({ cell }) => (
      // criar rota path param com o id que tem no valor da linha 
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