import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'E-mail',
    accessor: 'email'
  },
  {
    Header: 'Nome',
    accessor: 'name'
  },
  {
    Header: 'Tipo de Usuário',
    accessor: 'userType'
  },
  {
    Header: 'Total de Moedas',
    accessor: 'totalCoins'
  },
  {
    Header: 'Data de Nascimento',
    accessor: 'birthDay',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    }
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