import React from 'react'

import { useParams } from 'react-router-dom'

const Param = props => {
  const { id } = useParams()

  console.log('props', props.match.params.id)

  return (
    <div className="param">
      <h1>Param</h1>
      <h2>Valor: {id}!</h2>
    </div>
  )
}

export default Param
