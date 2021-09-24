export const COLUMNS = [
  {
    Header: 'E-mail',
    Footer: 'E-mail',
    accessor: 'email'
  },
  {
    Header: 'Nome',
    Footer: 'Nome',
    accessor: 'name'
  },
  {
    Header: 'Tipo de Usuário',
    Footer: 'Tipo de Usuário',
    accessor: 'userType'
  },
  {
    Header: 'Total de Moedas',
    Footer: 'Total de Moedas',
    accessor: 'totalCoins'
  },
  {
    Header: 'Editar',
    Cell: ({ cell }) => (
      <button value="teste" onClick={e => console.log('KKKKKKKK')}>
        Editar
      </button>
    ),
    Footer: 'Editar'
  }
]