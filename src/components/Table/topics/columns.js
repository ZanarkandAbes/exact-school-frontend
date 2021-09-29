import { format } from 'date-fns'
import ColumnFilter from '../filters/ColumnFilter'

export const COLUMNS = [
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
  },
  {
    Header: 'Visualizar',
    Cell: ({ cell }) => (
      // criar rota path param com o id que tem no valor da linha 
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